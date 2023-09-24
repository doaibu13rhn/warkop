const productInfo = async (req, res) => {
    try {
        const sql = `select ProductName, Price, Description FROM product`;
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

const insertNewProduct = (req, res) => {
    const { body } = req;
    const sql = "INSERT INTO product (ProductName, Price, Description, created_at) VALUES ($1,$2,$3,$4)";
    const values = [body.ProductName, body.Price, body.Description, body.created_at];
    db.query(sql, values)
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
        const sql = `update product set Price = $1, updated_at = now() where productid = $2`;
        const values = [body.Price, params.id];
        await db.query(sql, values);
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
        const sql = `delete from product where productid = $1 returning ProductName`;
        const values = [params.id];
        const data = await db.query(sql, values);
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

module.export = {
    productInfo,
    insertNewProduct,
    updatePrice,
    deleteProduct,
    searchProduct,
};