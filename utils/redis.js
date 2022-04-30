const { createClient } = require('redis');
const { redisHost, redisPort, redisPassword } = require('../config');
const logger = require('./logger');

class RedisHelper {
  constructor() {
    this.client = createClient({
      socket: {
        host: redisHost,
        port: redisPort,
      },
      password: redisPassword,
    });
  }

  initialize() {
    this.client.on('error', err => logger.error('Redis Client Error', err));
    this.client
      .connect()
      .then(() => {
        logger.info('Redis connected');
      })
      .catch(() => {
        logger.error('Failed to connect to redis');
      });
  }
}

const redisHelper = new RedisHelper();

module.exports = {
  redisHelper,
};
