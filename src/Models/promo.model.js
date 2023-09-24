const { query } = require("express");
const db = require("../Configs/postgre");

const readPromo = () => {
    const sql = `select promoName, startDate, endDate FROM promo`;
    const values = [];
    return db.query(sql, values);
};

const addPromo = (PpromoName, PdiscountPercentage, PstartDate, PendDate, PproductId, Pcreated_at) => {
    const sql = "INSERT INTO promo (promoName, discountPercentage, startDate, endDate, productId, created_at) VALUES ($1,$2,$3,$4,$5,$6)";
    const values = [PpromoName, PdiscountPercentage, PstartDate, PendDate, PproductId, Pcreated_at];
    return db.query(sql, values)
};

const promoUpdate = (promodiscount, id) => {
    const sql = `update promo set discountPercentage = $1, updated_at = now() where promoid = $2`;
    const values = [promodiscount, id];
    return db.query(sql, values);
};

const promoDelete = (id) => {
    const sql = `delete from promo where promoid = $1 returning promoName`;
    const values = [id];
    return db.query(sql, values);
};

module.exports = {
    readPromo,
    addPromo,
    promoUpdate,
    promoDelete,
};