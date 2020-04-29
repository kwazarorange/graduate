const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const port = process.env.PORT || 8080;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const connectShareDBtoServer = require("./sharedb");

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
};

app.use('/', indexRouter);
app.use('/users', usersRouter);

var server = app.listen(port);
console.log(`Listening on port ${port}`)
connectShareDBtoServer(server);

module.exports = app;
