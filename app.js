const mongoose = require("mongoose");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

require('dotenv').config()

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var predictRouter = require("./routes/predict");
var patientRouter = require("./routes/patients");
var nurseRouter = require("./routes/nurses");

var app = express();


mongoose
  // .connect("mongodb://localhost/care-pair")
  .connect(process.env.MONGO_DB_CONNECT_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB"));

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "./public/build")));

app.get("/", (req, res) => {
  res.sendFile("./public/build/index.html", (err) => {
    res.status(500).send(err);
  });
});





app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/predict", cors(), predictRouter);
app.use("/patient", cors(), patientRouter);
app.use("/nurse", cors(), nurseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
