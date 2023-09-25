const authRouther = require("express").Router();
const argon = require("argon2");

authRouther.post("/", (req, res) => {
    const { body } = req;

})
module.exports = authRouther;