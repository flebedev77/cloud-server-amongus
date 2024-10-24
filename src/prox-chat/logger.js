const fs = require('fs');
const path = require('path');

// Define the log file path
const logFilePath = path.join(__dirname, "../../", "logs", 'app.log');

// Function to log messages
function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}] ${message}`;

    // Write to console
    console.log(formattedMessage);

    // Append to log file
    fs.appendFile(logFilePath, formattedMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}

// Export the logger functions
module.exports = {
    info: (message) => log(message, 'INFO'),
    warning: (message) => log(message, 'WARNING'),
    error: (message) => log(message, 'ERROR'),
};
