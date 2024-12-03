const express = require("express");
const socketio = require("socket.io");
const { exec } = require('child_process');
const logger = require("./logger");
const app = express();

const PORT = process.env.PORT || 8050;

// @ts-ignore
const io = new socketio.Server(app.listen(PORT, logger.info(`Server socket listening on port ${PORT}`)), {
    cors: {
        origin: "*", 
    }
})

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static("public"));


io.on("connection", (socket) => {
    logger.info(`Socket: ${socket.id} connected`);

    socket.on("disconnect", () => {
        logger.info(`Socket ${socket.id} disconnected`);
    })


    socket.on("message", (msg) => {
        io.emit("message", msg);
	logger.info(msg);
    })
})

app.get("/cmd/:command", async (req, res) => {
    logger.info(`Command received ${req.params.command}`);
    res.send(await cmd(req.params.command));	
})

async function cmd(command_string) {
    return new Promise((resolve) => {
    exec(command_string, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        logger.info(`stdout: ${stdout}`);
    resolve(stdout);	
    });
    });
}

app.get("/logs", (req, res) => {
    res.render("index", {
        log: logger.log_str.log_str
    })
})

