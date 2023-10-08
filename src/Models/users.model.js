const { query } = require("express");
const db = require("../Configs/postgre");

const addUsers = (Uname, Uemail, Upassword, Uaddress) => {
    const sql = "INSERT INTO users (Username, email, password, address) VALUES ($1,$2,$3,$4)";
    const values = [Uname, Uemail, Upassword, Uaddress];
    return db.query(sql, values)
};

const update = (usersaddress, id) => {
    const sql = `update users set address = $1, updated_at = now() where usersid = $2`;
    const values = [usersaddress, id];
    return db.query(sql, values);
};

const deleteUsers = (id) => {
    const sql = `delete from users where usersid = $1 returning Username`;
    const values = [id];
    return db.query(sql, values);
};

const readUsers = () => {
    const sql = `select  Username, address FROM users`;
    const values = [];
    return db.query(sql, values);
};

module.exports = {
    addUsers,
    update,
    deleteUsers,
    readUsers,
};