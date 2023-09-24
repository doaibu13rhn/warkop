const pg = require("pg");

const { Pool } = pg;

const db = new Pool({
    host: "localhost",
    database: "warkop",
    user: "doaibu",
    password: "12345",
});

module.exports = db;