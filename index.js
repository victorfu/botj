'use strict';
const http = require('http');
const db = require('./db');
const { env, port, isSocketIOEnabled, isRedisEnabled } = require('./config');
const app = require('./express');
const shutdown = require('./shutdown');
const { socketio } = require('./utils/sio');
const logger = require('./utils/logger');
const { redisHelper } = require('./utils/redis');
const next = require('next');
const nextApp = next({ dev: env === 'development' });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.use('/', (req, res) => {
    return handle(req, res);
  });
  const server = http.createServer(app);

  if (isSocketIOEnabled) {
    socketio.initialize(server);
  }

  if (isRedisEnabled) {
    redisHelper.initialize();
  }

  server.listen(port, async () => {
    await db.init();

    logger.info(`Server listening on port ${port}`);
    logger.info(`Env ${env}`);

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  });
});
