const mongoose = require("mongoose");

const Patient = new mongoose.model(
  "Patient",
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

exports.Patient = Patient;
