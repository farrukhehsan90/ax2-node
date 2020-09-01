var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors")
var io = require("socket.io")();

var indexRouter = require('./routes/index');
var app = express();

let socketInterval;
app.io = io;

mongoose
  .connect(
    "mongodb+srv://sud:zaid123321@cluster0.oxysc.mongodb.net/<dbname>?retryWrites=true&w=majority"   
  )
  // mongoose.connect('mongodb://localhost/SaloonApp')
  .then(() => console.log("connected to Assignment APP..."))
  .catch((err) => console.log("Could not connect to database...", err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.io.on("connection", async function (client) {
  console.log("New client connected");
  if (socketInterval) {
    clearInterval(socketInterval);
  }
  require("./sockets/visualizeData")(client);

  client.on("disconnect", function () {
    console.log("Client disconnected");
    clearInterval(socketInterval);
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
