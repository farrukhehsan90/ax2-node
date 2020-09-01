var express = require('express');
var app = express();

const data = require("./data");

app.use("/data", data);

module.exports = app;
