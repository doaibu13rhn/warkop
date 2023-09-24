const ordersInfo = async (req, res) => {
    try {
        const sql = `select UsersId, date_of_Orders, subTotal FROM orders`;
        const result = await db.query(sql);
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
    const sql = "INSERT INTO orders (date_of_Orders, UsersId, subTotal, created_at) VALUES ($1,$2,$3,$4)";
    const values = [body.date_of_Orders, body.UsersId, body.subTotal, body.created_at];
    db.query(sql, values)
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
        const sql = `update orders set subTotal = $1, updated_at = now() where ordersid = $2`;
        const values = [body.subTotal, params.id];
        await db.query(sql, values);
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
        const sql = `delete from orders where ordersid = $1 returning date_of_orders`;
        const values = [params.id];
        const data = await db.query(sql, values);
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