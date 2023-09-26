const { query } = require("express");
const db = require("../Configs/postgre");

const readProduct = (page = 1, limit = 3) => {
    const sql = `SELECT
    p.ProductName AS "Nama Produk",
    c.categoriesName AS "Kategori",
    p.Price AS "Harga",
    pr.promoName AS "Promo",
    pr.discountPercentage AS "Diskon (%)"
FROM
    product p
JOIN
    categories c ON p.categoriesId = c.CategoriesId
LEFT JOIN
    promo pr ON p.productId = pr.productId limit $1 offset $2`;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const values = [limit, offset];
    return db.query(sql, values);
};

const count = (queries) => {
    let sql = `select count(*) as "total_data" from product p`;
    const values = [];
    if (queries.title || queries.genreId) sql += " where";
    if (queries.title) {
        sql += ` b.book_name ilike $${values.length + 1}`;
        values.push(`%${queries.title}%`);
    }
    console.log(sql, values);
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

const search = (title) => {
    const sql = `SELECT * FROM product
        WHERE ProductName ilike $1`;
    const values = [title];
    return db.query(sql, values);
};

module.exports = {
    readProduct,
    insertProduct,
    updateProduct,
    productDelete,
    count,
    search,
};