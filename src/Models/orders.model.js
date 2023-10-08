const { query } = require("express");
const db = require("../Configs/postgre");

const readOrders = () => {
    const sql = `select UsersId, date_of_Orders, subTotal FROM orders`;
    const values = [];
    return db.query(sql, values);
};

const addOrders = (Odate_of_Orders, OsubTotal) => {
    const sql = "INSERT INTO orders (date_of_Orders, subTotal) VALUES ($1,$2)";
    const values = [Odate_of_Orders, OsubTotal];
    return db.query(sql, values);
};

const ordersUpdate = (orderssubTotal, id) => {
    const sql = `update orders set subTotal = $1, updated_at = now() where ordersid = $2`;
    const values = [orderssubTotal, id];
    return db.query(sql, values);
};

const ordersDelete = (id) => {
    const sql = `delete from orders where ordersid = $1 returning date_of_orders`;
    const values = [id];
    return db.query(sql, values)
};

module.exports = {
    readOrders,
    addOrders,
    ordersDelete,
    ordersUpdate,
};