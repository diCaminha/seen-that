const express = require('express')();

express.use((req, res, next) => {
    console.log("first middleware");
    next();
});

express.use((req, res, next) => {
    console.log("second middleware");
});

module.exports = express;