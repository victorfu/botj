const express = require('express');
const { lineNotifyClientId, lineNotifyRedirectUrl, lineLiffId } = require('../config');
const queryString = require('query-string');
const router = express.Router({});

router.get('/', (req, res) => {
  res.render('home', { title: 'botj', message: 'Hello there!', lineLiffId: lineLiffId });
});

router.get('/config', (req, res) => {
  const data = {
    response_type: 'code',
    client_id: lineNotifyClientId,
    redirect_uri: lineNotifyRedirectUrl,
    scope: 'notify',
    state: Date.now(), // TODO: change to some useful information
  };
  const url = `https://notify-bot.line.me/oauth/authorize?${queryString.stringify(data)}`;
  res.render('config', { title: 'botj', message: 'Configure line notify', url });
});

module.exports = router;
