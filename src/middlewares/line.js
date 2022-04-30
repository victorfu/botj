const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

const eventHandler = (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
};

async function handleEvent(event) {
  console.log('=================================');
  console.log('event: ');
  console.log(event);
  console.log('=================================');

  if (event.type !== 'message' || event.message.type !== 'text' || event.message.emojis) {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, event.message);
}

const lineMiddleware = [line.middleware(config), eventHandler];

module.exports = {
  lineMiddleware,
};
