'use strict';

var Log = require('./log.model');
var CONF = require('config');
var http = require('http');
var bunyan = require('bunyan');
var util = require('util');
var Writable = require('stream').Writable;
var LoggerStream;
var serializers;

util.inherits(LoggerStream, Writable);

function LoggerStream (options) {
  Writable.call(this, options);
}

LoggerStream.prototype._write = function (chunk, encoding, callback) {
  var req;
  var log = chunk;

  //Write to process.stdout
  process.stdout.write(log);

  //Save in mongo Log model
  if (typeof log == 'string') log = JSON.parse(log);  
  Log.create(log, function (error, _log) {
    if (error) self.alert({message: error.message, log: log});
    self.alertLog(_log);
  });

  req.end(chunk);
  callback();
};

serializers = {
  req: function (req) {
    return {
      method: req.method,
      host: req.host,
      port: req.port,
      path: req.path,
      headers: req.headers
    };
  }
};

delete bunyan.stdSerializers.req;
util._extend(serializers, bunyan.stdSerializers);

module.exports = {
  create: function (name) {
    return bunyan.createLogger({
      name: name,
      serializers: serializers,
      stream: new LoggerStream(),
      level: 'trace'
    });
  }
};