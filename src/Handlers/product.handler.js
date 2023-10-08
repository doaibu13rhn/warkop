const { readProduct, insertProduct, updateProduct, productDelete, search, count } = require("../Models/product.model")

const productInfo = async (req, res) => {
    try {
        const { query } = req;
        const result = await readProduct(query.page, query.limit);
        if (!result.rows.length) return res.status(404).json({
            msg: "Page not found",
        });
        const metaResult = await count({
            page: query.page,
            limit: query.limit,
        });
        const totalData = parseInt(metaResult.rows[0].total_data);
        const totalPage = Math.ceil(totalData / parseInt(query.limit));
        const isLastPage = parseInt(query.page) > totalPage;
        const meta = {
            page: parseInt(query.page),
            totalPage,
            totalData,
            next: isLastPage ? null : "next page link",
            prev: parseInt(query.page) === 1 ? null : "prev page link",
        };
        res.status(201).json({
            msg: "success",
            result: result.rows,
            meta,
        })
    } catch (error) {
        res.status(500).json({
            msg: "internal server error",
            error: error,
        })
    }
};

const insertNewProduct = (req, res) => {
    const { body } = req;
    insertProduct(body.ProductName, body.Price, body.Description)
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
        await updateProduct(body.price, params.id);
        res.status(200).json({
            msg: `update Price for product id ${params.id} has changed to ${body.price}`,
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
        const data = await productDelete(params.id);
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
        const result = await search(`%${query.title}%`);
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
            msg: "internal server error",
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