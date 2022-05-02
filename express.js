'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');
const pageRoutes = require('./page-routes');
const webhooks = require('./webhooks');
const { env, apiPrefix } = require('./config');
const { errorHandler, errorConverter } = require('./middlewares/error');
const { configureSwagger } = require('./utils/swagger');

const app = express();
app.use(morgan(env === 'development' ? 'dev' : 'short'));
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');
app.use(compression());
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// the line middleware needs to be placed before body json parser
// https://line.github.io/line-bot-sdk-nodejs/guide/webhook.html#build-a-webhook-server-with-express
app.use('/webhook', webhooks);

// web pages
// app.use('/', pageRoutes);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// APIs
app.use(apiPrefix, routes);

// catch 404 and forward to error handler
app.use(apiPrefix, errorConverter);
app.use(errorHandler);

// API docs
configureSwagger(app);

module.exports = app;
