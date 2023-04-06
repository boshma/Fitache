var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/ServerIndex');
var usersRouter = require('./routes/ServerUsers');
const dashboardRouter = require('./routes/ServerFitnessDashboard');
const connectToDatabase = require('./config/database');

var app = express();

// Connect to the database
connectToDatabase();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Use the fitness dashboard router
app.use('/api/dashboard', dashboardRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

module.exports = app;
