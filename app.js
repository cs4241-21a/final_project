var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

console.log("Adding routers")
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter)
app.use(express.static(path.join(__dirname, 'public'))); //Needs to be at end or you need to change the homepage file to something that's not index.html

module.exports = app;
