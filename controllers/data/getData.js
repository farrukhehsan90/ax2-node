//***** Modules goes here *****//
const express = require("express");

const { visualizeData } = require("../../Models/data.model");

//***** ///// *****//

//***** Express Router to export in module *****//
const app = express();
//***** ///// *****//


app.get("/", async (req, res) => {
  getData(req, res);
});

async function getData(req, res) {
  try {
    const data = await visualizeData.find();
    res.send({ 
      success: true, 
      msg: "data fount",
       data: data 
      });
  } catch (err) {
    res.send({ 
      success: false,
       msg: "Error", 
       data: "" 
      });
  }
}
module.exports = app;
