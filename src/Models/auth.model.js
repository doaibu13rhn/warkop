const db = require("../Configs/postgre");

const createUsers = (Username, email, password) => {
    const sql = `insert into users (Username, email, password) values ($1,$2,$3)`;
    const values = [Username, email, password];
    return db.query(sql, values);
};

const getPsw = (email) => {
    const sql = `select password, Username, user_role AS \"role\" from users where email = $1`;
    const values = [email];
    return db.query(sql, values);
};

const delUserToken = (usersToken) => {
    const sql = "delete from users_activation where token = $1";
    const values = [usersToken];
    return db.query(sql, values);
};

module.exports = {
    createUsers,
    getPsw,
    delUserToken,
};