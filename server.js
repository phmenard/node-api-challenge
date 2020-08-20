const express = require('express');

const actionsRouter = require("./routers/actionsRouter");
const projectsRouter = require("./routers/projectRouter");

const server = express();

server.use(express.json);

server.use(actionsRouter);
server.use(projectsRouter);

server.use((err, req, res, next) =>{
    res.status(500).json({message: "Internal server error."})
})

