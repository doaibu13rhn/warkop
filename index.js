require("dotenv").config();

const express = require("express");
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(8000, () => {
    console.log("server is running at port 8000")
})
const mainRouter = require("./src/Routers/main.router");
server.use(mainRouter);