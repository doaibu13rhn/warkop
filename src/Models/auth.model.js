const db = require("../Configs/postgre");

const createUsers = (Username, email, password, address) => {
    const sql = `insert into users (Username, email, password, address) values ($1,$2,$3,$4)`;
    const values = [Username, email, password, address];
    return db.query(sql, values);
};

module.exports = {
    createUsers,
};