const authRouther = require("express").Router();


const { register } = require("../Handlers/auth.handler")

authRouther.post("/register", register);

module.exports = authRouther;