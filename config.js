const path = require('path');

module.exports = {
    isProduction: false,
    rootPath: (...args) => path.join(__dirname, ...args),
    devServerPort: process.env.PORT || 5000,
    serverPort: 5010,
};
