const express = require('express');
const { msgOk } = require('../../utils/constants');
const router = express.Router();

/**
 * GET /api/ping
 * @tags util
 * @summary test the reachability of the server
 * @return {string} 200 - success response
 */
router.get('/ping', (req, res) => {
  res.json(msgOk);
});

/**
 * GET /api/version
 * @tags util
 * @summary get the version of the server
 * @return {string} 200 - success response
 */
router.get('/version', (req, res) => {
  const version = require('../../package.json').version;
  res.json(version);
});

module.exports = router;
