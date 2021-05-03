"use strict";
const rateLimit = require("express-rate-limit");
const exception = require('./exception.service');

const limitReached = (req, res) => {
    exception.generateException(new exception.httpException('CLIENT_004'), res);
}

const apiLimiter = rateLimit({
    windowMs: 1000, // 1 minutes
    max: 10,
    handler: limitReached
});

module.exports = {
    apiLimiter
}
