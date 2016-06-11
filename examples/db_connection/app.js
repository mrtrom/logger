var mongoose = require('mongoose');
var CONF = require('config');

//Connection to DB
global.loggerDatabase = mongoose.createConnection(CONF.db.logger, CONF.db.options);

loggerDatabase.on('connected', function () {
  logger.info('Connected to logger database');
});

loggerDatabase.on('error', function (error) {
  if (error.code !== 18)
    logger.fatal({err: error}, 'Logger database connection error');
});

//Logger example
var Logger = require('logger');
var logger = Logger.create('main');

logger.info('Hello world!');