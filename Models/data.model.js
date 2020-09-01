const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Date: {
        type: Date,
      },
      Open: {
      type: String,
      required: true,
    },
    High: {
      type: String,
      required: true,
    },
    Low: {
      type: String,
      required: true,
    },
    Close: {
      type: String,
      required: true,
    },
    Volume: {
      type: String,
      required: true,
    },
    createdDate: { type: Date, default: Date.now },
  });
  
  const visualizeData = mongoose.model("visualizeData", userSchema);
  
  exports.visualizeData = visualizeData;
  