const express = require("express");
const usersRouter = express.Router();


const { isLogin, isAdmin, isUser } = require("../Middlewares/authorization");
const { getUsersInfo, insertNewUsers, updateAddress, usersDelete } = require("../Handlers/users.handler");

usersRouter.get("/", getUsersInfo);

usersRouter.post("/", insertNewUsers);

usersRouter.patch("/:id", updateAddress);

usersRouter.delete("/:id", isAdmin, usersDelete);

module.exports = usersRouter;