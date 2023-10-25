require("dotenv").config();

const express = require("express");
const server = express();
const cors = require("cors");
server.use(express.static("./public"));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(8000, () => {
    console.log("server is running at port 8000")
})

server.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["POST", "PATCH"],
    })
);
const mainRouter = require("./src/Routers/main.router");
server.use(mainRouter);