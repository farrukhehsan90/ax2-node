//***** Modules goes here *****//
const express = require('express');
//***** ///// *****//

//***** Express Router to export in module *****//
const app = express.Router();
//***** ///// *****//

const addData = require('../controllers/data/addData');
app.use('/add', addData);

const getDate = require('../controllers/data/getData');
app.use('/get', getDate);


module.exports = app;