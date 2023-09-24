const promoInfo = async (req, res) => {
    try {
        const sql = `select promoName, startDate, endDate FROM promo`;
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

const insertNewPromo = (req, res) => {
    const { body } = req;
    const sql = "INSERT INTO promo (promoName, discountPercentage, startDate, endDate, productId, created_at) VALUES ($1,$2,$3,$4,$5,$6)";
    const values = [body.promoName, body.discountPercentage, body.startDate, body.endDate, body.productId, body.created_at];
    db.query(sql, values)
        .then((data) => {
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
        const sql = `update promo set discountPercentage = $1, updated_at = now() where promoid = $2`;
        const values = [body.discountPercentage, params.id];
        await db.query(sql, values);
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
        const sql = `delete from promo where promoid = $1 returning promoName`;
        const values = [params.id];
        const data = await db.query(sql, values);
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