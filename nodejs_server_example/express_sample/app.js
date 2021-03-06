/**
 * Require all necessary modules
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');                 // logging
var cookieParser = require('cookie-parser');    // for cookies
var bodyParser = require('body-parser');

var index = require('./routes/index');          // index page
var users = require('./routes/users');          // users page
var second_page = require('./routes/second_page');

var app = express();                            // use express in this app

app.locals.local_var = "123456789";             // locals are available everywhere in the app

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');                  // "embedded java script"

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// ^ data logging...

app.use('/', index);                            // redirect calls to view index to ./routes/index
app.use('/users', users);                       // redirect calls to view users to ./routes/users
app.use('/second_page', second_page);

// production error handler
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);                                    // call the next error hancler
});

// development error handler
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
