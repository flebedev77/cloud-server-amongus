const fs = require("fs");
const path = require("path");

const l = { log_str: "" }

function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}] ${message}`;

    // Write to console
    console.log(formattedMessage);
    l.log_str += formattedMessage + "\n";

    // const p = path.join(__dirname, "public", "logs", "all.log");
    // if (!fs.existsSync(p)) {
    //     fs.writeFile(p, "");
    // }
    // fs.appendFileSync(p, formattedMessage);
}

// Export the logger functions
module.exports = {
    info: (message) => log(message, 'INFO'),
    warning: (message) => log(message, 'WARNING'),
    error: (message) => log(message, 'ERROR'),
    log_str: l,
};
