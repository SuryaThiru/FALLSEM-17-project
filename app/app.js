const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// the modules for routes
const index = require('./routes/index');
const login = require('./routes/login');
const logout = require('./routes/logout');
const dash = require('./routes/dash');
const classRoute = require('./routes/class');
const leadClass = require('./routes/leadclass');
const guardian = require('./routes/guardian');
const interaction = require('./routes/interaction');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure session
app.use(session({
    secret: 'secret session code',
    saveUninitialized: true,
    resave: false
}));

// the routes
app.use('/', index);
app.use('/index', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/dash', dash);
app.use('/class', classRoute);
app.use('/leadclass', leadClass);
app.use('/guardian', guardian);
app.use('/interactions', interaction);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
