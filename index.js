const express = require("express");
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const pg = require("pg");
const { Pool } = pg;

const db = new Pool({
    host: "localhost",
    database: "warkop",
    user: "doaibu",
    password: "12345",
});

//users
server.get("/users", async (req, res) => {
    try {
        const sql = `select  Username, address FROM users`;
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
});

server.post("/users", (req, res) => {
    const { body } = req;
    const sql = "INSERT INTO users (Username, email, password, address, created_at) VALUES ($1,$2,$3,$4,$5)";
    const values = [body.Username, body.email, body.password, body.address, body.created_at];
    db.query(sql, values)
        .then((data) => {
            res.status(201).json({
                msg: "successfully added new users data",
                result: data.rows,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                msg: "internal server error",
            });
        });
});

server.patch("/users/:id", async (req, res) => {
    try {
        const { body, params } = req;
        const sql = `update users set address = $1, updated_at = now() where usersid = $2`;
        const values = [body.address, params.id];
        await db.query(sql, values);
        res.status(200).json({
            msg: `update address for user id ${params.id} has changed to ${body.address}`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error",
        })
    }
});

server.delete("/users/:id", async (req, res) => {
    try {
        const { params } = req;
        const sql = `delete from users where usersid = $1 returning Username`;
        const values = [params.id];
        const data = await db.query(sql, values);
        res.status(200).json({
            msg: `user id ${params.id} has been deleted`,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error",
        })
    }
});
//users

// product
server.get("/product", async (req, res) => {
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
});

server.post("/product", (req, res) => {
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
});

server.patch("/product/:id", async (req, res) => {
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
});

server.delete("/product/:id", async (req, res) => {
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
});
// product

// promo
server.get("/promo", async (req, res) => {
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
});

server.post("/promo", (req, res) => {
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
});

server.patch("/promo/:id", async (req, res) => {
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
});

server.delete("/promo/:id", async (req, res) => {
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
});
// promo

// orders
server.get("/orders", async (req, res) => {
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
});

server.post("/orders", (req, res) => {
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
});

server.patch("/orders/:id", async (req, res) => {
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
});

server.delete("/orders/:id", async (req, res) => {
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
});
// orders

server.listen(8000, () => {
    console.log("server is running at port 8000")
})