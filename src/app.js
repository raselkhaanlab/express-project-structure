
const express = require('express');
const app = express();

const bootstraping = require("./bootstrap/appBootstrap")(express,app);

const exceptionsHandler = require("./exceptions/handler")(app);

// application start with setup
bootstraping.appSetup();
//start routing
bootstraping.startRouting();
// application unexpected error handling
exceptionsHandler.handle();

module.exports = app;
