const authRouther = require("express").Router();
const { isLogin } = require("../Middlewares/authorization");


const { register, login, logout } = require("../Handlers/auth.handler")

authRouther.post("/", login);
authRouther.post("/register", register);
authRouter.delete("/logout", isLogin, logout);

module.exports = authRouther;