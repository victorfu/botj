const winston = require('winston');
const { env } = require('../config');

const options = {
  transports: [
    new winston.transports.Console({
      level: env === 'production' ? 'error' : 'debug',
    }),
  ],
  format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple()),
};

const logger = winston.createLogger(options);

if (env !== 'production') {
  logger.debug('Logging initialized at debug level');
}

module.exports = logger;
