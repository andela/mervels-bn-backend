/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import * as Sentry from '@sentry/node';
import method_overide from 'method-override';
import notifications from './utils/notifications/index';
import logger from './utils/logger/logger';
import routes from './routes';
import socket from './utils/socket';
import Schedule from './services/scheduler';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();
Sentry.init({ dsn: process.env.SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler());
app.enable('trust proxy');
app.use(cors());
// Normal express config defaults
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(method_overide());

app.use(express.static(`${__dirname}/public/`));

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

// running all event listeners
notifications();

// runs the scheduler
const schedule = new Schedule('0 0 * * 0');
schedule.deleteSchedule();

app.use(routes);

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
    logger.error(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}
app.use(Sentry.Handlers.errorHandler());
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  logger.error(err.stack);
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

socket.socketFunction.socketStartUp(server);

export default { app };
