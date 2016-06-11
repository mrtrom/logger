'use strict';

var Schema = require('mongoose').Schema;

var logSchema = new Schema({
  name: String,
  hostname: String,
  pid: String,
  component: String,
  level: Number,
  msg: String,
  time: {
    type: Date,
    default: function () {
      return new Date()
    }
  }
}, {
  strict: false
});

logSchema.index({time: 1, component: 1});
logSchema.index({name: 1, component: 1, time: -1});
logSchema.index({time: 1}, {expireAfterSeconds: 60 * 60 * 24 * 7});

module.exports = loggerDatabase.model('Log', logSchema);