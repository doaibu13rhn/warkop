const express = require("express");
const ordersRouter = express.Router();

const { isLogin, isAdmin, isUser } = require("../Middlewares/authorization");

const { ordersInfo, insertNewOrders, updateOrders, deleteOrders } = require("../Handlers/orders.handler")

ordersRouter.get("/", isUser, isAdmin, ordersInfo);

ordersRouter.post("/", insertNewOrders);

ordersRouter.patch("/:id", updateOrders);

ordersRouter.delete("/:id", deleteOrders);

module.exports = ordersRouter;