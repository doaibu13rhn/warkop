const express = require("express");
const usersRouter = express.Router();

const { getUsersInfo, insertNewUsers, updateAddress, usersDelete } = require("../Handlers/users.handler");

usersRouter.get("/", getUsersInfo);

usersRouter.post("/", insertNewUsers);

usersRouter.patch("/:id", updateAddress);

usersRouter.delete("/:id", usersDelete);

module.exports = usersRouter;