const { addPromo, promoUpdate, readPromo, promoDelete } = require("../Models/promo.model");

const promoInfo = async (req, res) => {
    try {
        const { query } = req;
        const result = await readPromo(query);
        res.status(201).json({
            msg: "success",
            result: result.rows
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error,
        })
    }
};

const insertNewPromo = (req, res) => {
    const { body } = req;
    addPromo(body.promoName, body.discountPercentage, body.startDate, body.endDate, body.productId, body.created_at).then((data) => {
        res.status(201).json({
            msg: "successfully added new promo",
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

const updatePromo = async (req, res) => {
    try {
        const { body, params } = req;
        await promoUpdate(body.discountPercentage, params.id);
        res.status(200).json({
            msg: `update discount for product id ${params.id} has changed to ${body.discountPercentage}`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error",
        })
    }
};

const deletePromo = async (req, res) => {
    try {
        const { params } = req;
        const data = await promoDelete(params.id);
        res.status(200).json({
            msg: `promo id ${params.id} has been deleted`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error",
        })
    }
};

module.exports = {
    promoInfo,
    insertNewPromo,
    updatePromo,
    deletePromo,
};