const express = require('express');
const rootRoute = require('./root');
const documentRoute = require('./document');
const emailRoute = require('./email');
const { isFileStorageEnabled, isSendgridEnabled } = require('../config');
const router = express.Router({});

router.use(rootRoute);

if (isFileStorageEnabled) {
  router.use(documentRoute);
}

if (isSendgridEnabled) {
  router.use(emailRoute);
}

module.exports = router;
