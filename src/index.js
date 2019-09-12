/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import '@babel/polyfill';

const fs = require('fs'),
  http = require('http'),
  path = require('path'),
  methods = require('methods'),
  express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  passport = require('passport'),
  errorhandler = require('errorhandler');

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.enable('trust proxy');

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());

app.use(express.static(`${__dirname}/public`));

if (!isProduction) {
  app.use(errorhandler());
}

app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && isProduction) {
    const newUrl = `https://${req.get('host') + req.originalUrl}`;
    res.redirect(newUrl);
  }
  next();
});

app.use(require('./routes'));

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
