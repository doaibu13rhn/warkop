const express = require("express");
const ordersRouter = express.Router();

const { ordersInfo, insertNewOrders, updateOrders, deleteOrders } = require("../Handlers/orders.handler")
ordersRouter.get("/", ordersInfo);

ordersRouter.post("/", insertNewOrders);

ordersRouter.patch("/:id", updateOrders);

ordersRouter.delete("/:id", deleteOrders);

module.exports = ordersRouter;