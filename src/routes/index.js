const express = require('express');
const rootRoute = require('./root');
const fileRoute = require('./file');
const emailRoute = require('./email');
const exampleRoute = require('./example');
const { isFileStorageEnabled, isSendgridEnabled } = require('../config');
const router = express.Router({});

router.use(rootRoute);
router.use(exampleRoute);

if (isFileStorageEnabled) {
  router.use(fileRoute);
}

if (isSendgridEnabled) {
  router.use(emailRoute);
}

module.exports = router;
