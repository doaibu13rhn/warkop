const { readProduct, insertProduct, productUpdate, productDelete } = require("../Models/product.model")

const productInfo = async (req, res) => {
    try {
        const { query } = req;
        const result = await readProduct(query);
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

const insertNewProduct = (req, res) => {
    const { body } = req;
    insertProduct(body.ProductName, body.Price, body.Description, body.created_at)
        .then((data) => {
            res.status(201).json({
                msg: "successfully added new product",
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

const updatePrice = async (req, res) => {
    try {
        const { body, params } = req;
        await productUpdate(body.price, params.id);
        res.status(200).json({
            msg: `update Pice for product id ${params.id} has changed to ${body.Price}`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error",
        })
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { params } = req;
        const data = await productDelete(paramas.id);
        res.status(200).json({
            msg: `Product id ${params.id} has been deleted`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error",
        })
    }
};

const searchProduct = async (req, res) => {
    try {
        const { query } = req;
        const sql = `SELECT * FROM product
        WHERE ProductName ilike $1`;
        const values = [`%${query.title}%`];
        const result = await db.query(sql, values);
        if (result.rows.length === 0) return res.status(404).json({
            msg: "This product is empty"
        })
        res.status(201).json({
            msg: "success",
            result: result.rows
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "error cuy",
            error: error,
        })
    }
};

module.exports = {
    productInfo,
    insertNewProduct,
    updatePrice,
    deleteProduct,
    searchProduct,
};