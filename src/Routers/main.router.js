const express = require("express");
const mainRouter = express.Router();

const usersRouter = require("./users.router");
const promoRouter = require("./promo.router");
// const productRouter = require("./product.router");
// const ordersRouter = require("./orders.router");

mainRouter.use("/users", usersRouter);
mainRouter.use("/promo", promoRouter);
// mainRouter.use("/product", productRouter);
// mainRouter.use("/orders", ordersRouter);

module.exports = mainRouter;