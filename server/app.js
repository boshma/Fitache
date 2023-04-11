//server/app.js

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 3000;
var indexRouter = require('./routes/ServerIndex');
var usersRouter = require('./routes/ServerUsers');
const dashboardRouter = require('./routes/ServerFitnessDashboard');
const connectToDatabase = require('./config/database');
const passport = require('passport'); 

var app = express();

require('events').EventEmitter.defaultMaxListeners = 20; 


// Connect to the database
connectToDatabase();

const isProduction = process.env.NODE_ENV === 'production';
const origin = isProduction ? 'http://ii-env.eba-xgyfgwwk.us-west-2.elasticbeanstalk.com/' : 'http://localhost:3001';
app.use(cors({ origin, credentials: true }));


// Initialize Passport 
app.use(passport.initialize()); // Add this line

// Passport configuration 
require('./middleware/auth')(passport);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, '../client/build')));




if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}



app.use('/', indexRouter);
app.use('/users', usersRouter);
// Use the fitness dashboard router
app.use('/api/dashboard', dashboardRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});



module.exports = app;



