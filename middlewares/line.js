const line = require('@line/bot-sdk');
const queryString = require('query-string');
const { Appointment } = require('../models');
const { lineNotifyClientId, lineNotifyRedirectUrl } = require('../config');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
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

  if (!event || !event.type) return Promise.resolve(null);

  const userId = event.source.userId;

  if (event.type === 'postback') {
    const data = event.postback.data;
    const parsed = queryString.parse(data);
    if (parsed.type === 'make_appointment' && parsed.state === 'end') {
      const datetime = event.postback.params.datetime;
      try {
        await Appointment.create({
          lineUserId: userId,
          datetime,
          event,
        });
      } catch (err) {
        console.error(err);
      }
      return client.replyMessage(event.replyToken, replyTextMessage(`預約的時間為: ${datetime.replace('T', ' ')}`));
    }
    if (parsed.type === 'cancel_appointment') {
      if (parsed._id === '-1') {
        return Promise.resolve(null);
      }
      await Appointment.deleteOne({ _id: parsed._id });
      const appts = await Appointment.find({ lineUserId: userId });
      const datetimes = appts.map(appt => appt.datetime.replace('T', ' ')).join('\n');
      return client.replyMessage(event.replyToken, replyTextMessage(`預約紀錄:\n${datetimes}`));
    }
  }

  if (event.message.text === '查詢預約') {
    try {
      const appts = await Appointment.find({ lineUserId: userId });
      const datetimes = appts.map(appt => appt.datetime.replace('T', ' ')).join('\n');
      return client.replyMessage(event.replyToken, replyTextMessage(`預約紀錄:\n${datetimes}`));
    } catch (err) {}
  }

  if (event.message.text === '預約') {
    return client.replyMessage(
      event.replyToken,
      replyTextMessage('開始預約流程', [datePickerAction('挑選日期', `type=make_appointment&state=end&timestamp=${Date.now()}`)]),
    );
  }

  if (event.message.text === '取消預約') {
    try {
      const appts = await Appointment.find({ lineUserId: userId });
      const datetimes = appts.map((appt, idx) => `${idx + 1} - ${appt.datetime.replace('T', ' ')}`).join('\n');
      const actions = appts.map((appt, idx) => postbackAction(`${idx + 1}`, `type=cancel_appointment&_id=${appt._id}`, `${idx + 1}`));
      actions.push(postbackAction('X', `type=cancel_appointment&_id=-1`, '不取消'));
      return client.replyMessage(event.replyToken, replyTextMessage(`預約紀錄:\n${datetimes}`, actions));
    } catch (err) {}
  }

  if (event.type !== 'message' || event.message.type !== 'text' || event.message.emojis) {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
}

function replyTextMessage(text, actions) {
  const msg = {
    type: 'text',
    text: text,
  };
  if (actions && isArrayFn(actions)) {
    msg['quickReply'] = { items: actions };
  }
  return msg;
}

function postbackAction(label, data, displayText) {
  return {
    type: 'action',
    action: {
      type: 'postback',
      label: label,
      data: data,
      displayText: displayText,
    },
  };
}

function datePickerAction(label, data, initial, max, min) {
  const obj = {
    type: 'action',
    action: {
      type: 'datetimepicker',
      label: label,
      data: data,
      mode: 'datetime',
    },
  };
  if (initial) {
    obj.action.initial = initial;
  }
  if (max) {
    obj.action.max = max;
  }
  if (min) {
    obj.action.min = min;
  }
  return obj;
}

function isArrayFn(obj) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(obj);
  } else {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
}

const lineMiddleware = [line.middleware(config), eventHandler];

module.exports = {
  lineMiddleware,
};
