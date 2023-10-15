var express = require("express");
// var tf = require("@tensorflow/tfjs");
var router = express.Router();
const { PythonShell } = require("python-shell");
const { spawn } = require("child_process");
// var buf = Buffer.from("abc");

const predcitions = {
  data: [
    { id: "1", name: "Sarah1", score: 96 },
    { id: "2", name: "Jessica1", score: 94 },
    { id: "3", name: "Elizabeth1", score: 90 },
    { id: "4", name: "Madison1", score: 89 },
  ],
};

/* GET home page. */
router.get("/", async function (req, res, next) {
  //   const modelPath = "./model.joblib";

  const modelPath = "./public/model.joblib";

  const inputData = [parseInt(req.query.id)];

  const scriptPath = "./script.py";

  output = [];

  script_name = "./public/script.py";

  options = [script_name, modelPath, inputData];
  console.log(options);
  const python = await spawn("python", options);

  await python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...", data);
    res.status(200).send(JSON.parse(data.toString().trim()));
  });

  await python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // console.log("output", output);
    // res.status(200).send(JSON.parse(output[0].trim()));
  });
});

module.exports = router;
