var express = require("express");
var router = express.Router();
const { Nurse } = require("../models/nurseModel");

router.get("/", async function (req, res, next) {
  const allNurses = await Nurse.find();
  res.send(allNurses);
});

router.get("/names", async function (req, res, next) {
  const allNurses = await Nurse.find().select({ fname: 1, Id: 1 });
  res.send(allNurses);
});

router.get("/id", async function (req, res, next) {
  var id = req.query.id;

  const allNurses = await Nurse.findOne({ Id: id });

  res.send(allNurses);
});
module.exports = router;
