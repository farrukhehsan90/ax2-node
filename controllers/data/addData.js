const express = require("express");
const Joi = require("joi");
const { visualizeData } = require("../../Models/data.model");
//***** ///// *****//

//***** Express Router to export in module *****//
const app = express();
//***** ///// *****//

app.post("/", async (req, res) => {
  addData(req, res);
});

async function addData(req, res) {
  let data = new visualizeData(req.body);
  try {
    const result = await data.save();
    res.send({ success: true, msg: "created", data: result });
  } catch (err) {
    console.log(err);
    res.send({ success: false, error: err });
  }
}

module.exports = app;
