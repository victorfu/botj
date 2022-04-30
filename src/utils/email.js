const sgMail = require('@sendgrid/mail');
const { sendgridApiKey } = require('../config');

sgMail.setApiKey(sendgridApiKey);

const sendEmail = (to, subject, text) => {
  const msg = {
    from: 'supergothere@gmail.com', // Change to your verified sender
    to: to,
    subject: subject,
    text: text,
  };
  sgMail.send(msg);
};

module.exports = {
  sendEmail,
};
