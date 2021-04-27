const fs = require('fs');
const path = require('path');
const util = require('util');

const LOG_FILE = path.join(__dirname, '..', 'log.log');

if (!fs.existsSync(LOG_FILE)) fs.writeFileSync(LOG_FILE, '');

const getMessage = (...args) => {
    return {
        time: (new Date).toISOString().slice(11,19),
        message: util.format(...args),
    };
}

const logMessage = (method, message, tag = '') => {
    console[method](message);
    fs.appendFileSync(LOG_FILE, tag + message + '\n');
}

const log = (...args) => logMessage('log', Object.values(getMessage(...args)).join(' '));

const error = (...args) => {
    const { time, message } = getMessage(...args);
    logMessage('error', `${time} [ERROR] ${message}`);
}

module.exports = { log, error };
