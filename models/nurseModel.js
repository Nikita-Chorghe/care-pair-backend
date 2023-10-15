const mongoose = require("mongoose");

const Nurse = new mongoose.model(
  "Nurse",
  new mongoose.Schema({
    Id: {
      type: Number,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
  })
);

exports.Nurse = Nurse;
