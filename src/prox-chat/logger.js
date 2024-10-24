function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}] ${message}`;

    // Write to console
    console.log(formattedMessage);

}

// Export the logger functions
module.exports = {
    info: (message) => log(message, 'INFO'),
    warning: (message) => log(message, 'WARNING'),
    error: (message) => log(message, 'ERROR'),
};
