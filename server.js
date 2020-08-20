const express = require('express');

const actionsRouter = require("./routers/actionsRouter");
const projectsRouter = require("./routers/projectsRouter");

const server = express();

server.use(express.json());

server.use("/myapi/actions", actionsRouter);
server.use("/myapi/projects", projectsRouter);

server.use((req, res, next) =>{
    res.status(500).json({message: "Internal server error."})
})

module.exports = server;