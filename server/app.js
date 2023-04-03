var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/fitnessDashboard');
const passport = require('passport');
const passportConfig = require('./config/passport');
const connectToDatabase = require('./config/database');

// Configure Passport
passportConfig(passport);


var app = express();

// Connect to the database
connectToDatabase();

// Initialize Passport
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
// Use the fitness dashboard router
app.use('/dashboard', dashboardRouter);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

module.exports = app;
