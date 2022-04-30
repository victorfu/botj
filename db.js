'use strict';
const mongoose = require('mongoose');
const { db, replicaSet, retryWrites, keepAlive, ssl } = require('./config');
const logger = require('./utils/logger');

let isConnected = false;

const init = () => {
  return new Promise(resolve => {
    if (!isConnected) {
      logger.info(`Mongodb connecting, isConnected: ${isConnected}`);
      mongoose.connect(
        db,
        {
          replicaSet,
          retryWrites,
          keepAlive,
          ssl,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        resolve,
      );
      mongoose.connection
        .on('connected', () => {
          isConnected = true;
          logger.info(`Mongodb connected, isConnected: ${isConnected}`);
        })
        .on('disconnected', () => {
          isConnected = false;
          logger.info(`Mongodb disconnected, isConnected: ${isConnected}`);
        })
        .on('error', err => {
          logger.error('=======Start of Mongodb Error Msg=======');
          logger.error(err);
          logger.error('=======End of Mongodb Error Msg=======');
          isConnected = false;
          throw new Error(`unable to connect to database: ${db}`);
        });
    } else {
      resolve();
    }
  });
};

const close = () => {
  if (isConnected) {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
  }
};

module.exports = {
  init,
  close,
};
