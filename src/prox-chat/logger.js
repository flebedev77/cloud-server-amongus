const fs = require("fs");
const path = require("path");

function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}] ${message}`;

    // Write to console
    console.log(formattedMessage);

    const p = path.join(__dirname, "public", "logs", "all.log");
    if (!fs.existsSync(p)) {
        fs.writeFile(p, "");
    }
    fs.appendFileSync(p, formattedMessage);
}

// Export the logger functions
module.exports = {
    info: (message) => log(message, 'INFO'),
    warning: (message) => log(message, 'WARNING'),
    error: (message) => log(message, 'ERROR'),
};
