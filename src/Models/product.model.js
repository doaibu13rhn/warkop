const { query } = require("express");
const db = require("../Configs/postgre");

const readProduct = () => {
    const sql = `select ProductName, Price, Description FROM product`;
    const values = [];
    return db.query(sql, values);
};

const insertProduct = (iProductName, iPrice, iDescription, icreated_at) => {
    const sql = "INSERT INTO product (ProductName, Price, Description, created_at) VALUES ($1,$2,$3,$4)";
    const values = [iProductName, iPrice, iDescription, icreated_at];
    return db.query(sql, values);
};

const updateProduct = (productPrice, id) => {
    const sql = `update product set Price = $1, updated_at = now() where productid = $2`;
    const values = [productPrice, id];
    return db.query(sql, values);
}

const productDelete = (id) => {
    const sql = `delete from product where productid = $1 returning ProductName`;
    const values = [id];
    return db.query(sql, values)
}

module.exports = {
    readProduct,
    insertProduct,
    updateProduct,
    productDelete,
};