const { readOrders, addOrders, ordersUpdate, ordersDelete } = require("../Models/orders.model")

const ordersInfo = async (req, res) => {
    try {
        const { query } = req;
        const result = await readOrders(query);
        res.status(201).json({
            msg: "success",
            result: result.rows
        })
    } catch (error) {
        res.status(500).json({
            msg: "error cuy",
            error: error,
        })
    }
};

const insertNewOrders = (req, res) => {
    const { body } = req;
    addOrders(body.date_of_Orders, body.UsersId, body.subTotal, body.created_at)
        .then((data) => {
            res.status(201).json({
                msg: "successfully added new order",
                result: data.rows,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                msg: "internal server error",
            });
        });
};

const updateOrders = async (req, res) => {
    try {
        const { body, params } = req;
        await ordersUpdate(body.subTotal, params.id)
        res.status(200).json({
            msg: `update Price total for order id ${params.id} has changed to ${body.subTotal}`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error",
        })
    }
};

const deleteOrders = async (req, res) => {
    try {
        const { params } = req;
        const data = await ordersDelete(params.id);
        res.status(200).json({
            msg: `order id ${params.id} has been deleted`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error",
        })
    }
};

module.exports = {
    ordersInfo,
    insertNewOrders,
    updateOrders,
    deleteOrders,
};