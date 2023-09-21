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
})

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
server.listen(8000, () => {
    console.log("server is running at port 8000")
})