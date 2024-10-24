const express = require("express");
const socketio = require("socket.io");
const logger = require("./logger");
const app = express();

const PORT = process.env.PORT || 8050;

// @ts-ignore
const io = new socketio.Server(app.listen(PORT, logger.info(`Server socket listening on port ${PORT}`)), {
    cors: {
        origin: "*", 
    }
})


io.on("connection", (socket) => {
    logger.info(`Socket: ${socket.id} connected`);

    socket.on("disconnect", () => {
        logger.info(`Socket ${socket.id} disconnected`);
    })


    socket.on("message", (msg) => {
        io.emit("message", msg);
    })
})