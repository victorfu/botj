'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const webhooks = require('./webhooks');
const { env, apiPrefix } = require('./config');
const { errorHandler, errorConverter } = require('./middlewares/error');
const { configureSwagger } = require('./utils/swagger');

const app = express();
app.use(morgan(env === 'development' ? 'dev' : 'short'));
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

// the line middleware needs to be placed before body json parser
// https://line.github.io/line-bot-sdk-nodejs/guide/webhook.html#build-a-webhook-server-with-express
app.use('/webhook', webhooks);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(compression());
app.use(cors());
app.use(helmet());
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(apiPrefix, routes);

// catch 404 and forward to error handler
app.use(apiPrefix, errorConverter);

app.use(errorHandler);

configureSwagger(app);

module.exports = app;
