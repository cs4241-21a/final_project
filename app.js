var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var app = express();

if (env === 'development') {
  var cors = require('cors');
  require('dotenv').config();
  app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  }));
  console.log('cors enabled');
}

// Mongodb connection string
const MONGODB = process.env.MONGODB;

var indexRouter = require('./routes/index');
const tournmentRouter = require('./routes/tournament');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/tournament', tournmentRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Connect to mongodb
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
