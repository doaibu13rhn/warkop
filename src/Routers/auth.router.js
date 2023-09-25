const authRouther = require("express").Router();


const { register, login } = require("../Handlers/auth.handler")

authRouther.post("/", login);
authRouther.post("/register", register);

module.exports = authRouther;