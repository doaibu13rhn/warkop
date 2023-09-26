const express = require("express");
const mainRouter = express.Router();

const usersRouter = require("./users.router");
const promoRouter = require("./promo.router");
const productRouter = require("./product.router");
const ordersRouter = require("./orders.router");
const authRouther = require("./auth.router");


const { isLogin, isAdmin, isUser } = require("../Middlewares/authorization");
const { singleUpload } = require("../Middlewares/diskUpload");

mainRouter.post("/upload", singleUpload("image"), (req, res) => {
    console.log(req.file);
    res.status(200).json({
        msg: "Success"
    })
});

mainRouter.use("/users", isLogin, usersRouter);
mainRouter.use("/promo", promoRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/orders", isLogin, ordersRouter);
mainRouter.use("/auth", authRouther);

module.exports = mainRouter;