const fetch = require('node-fetch');
const { lineNotifyRedirectUrl, lineNotifyClientId, lineNotifyClientSecret, lineNotifyTokenUrl } = require('../config');
const { Authorization } = require('../models');
const { version } = require('../package.json');

const lineNotifyMiddleware = async (req, res) => {
  // state is line user id
  const state = req.query.state;
  const code = req.query.code;

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: lineNotifyRedirectUrl,
    client_id: lineNotifyClientId,
    client_secret: lineNotifyClientSecret,
  });

  const response = await fetch(lineNotifyTokenUrl, {
    method: 'post',
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  const data = await response.json();
  console.log('================================');
  console.log(state);
  console.log(data.access_token);
  console.log('================================');

  await Authorization.findOneAndUpdate(
    { userId: state },
    {
      type: 'line-notify',
      userId: state.toString(),
      token: data.access_token,
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  res.json({ message: '設定成功! 請關閉網頁 :D' });
};

module.exports = {
  lineNotifyMiddleware,
};
