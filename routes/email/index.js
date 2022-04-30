const express = require('express');
const { sendEmail } = require('../../utils/email');
const { validateBody } = require('../../utils/ajv');
const { ValidateProps, msgOk } = require('../../utils/constants');
const router = express.Router();

router.post(
  '/send-email',
  validateBody({
    type: 'object',
    properties: {
      to: ValidateProps.email.to,
      subject: ValidateProps.email.subject,
      text: ValidateProps.email.text,
    },
    required: ['to', 'subject', 'text'],
    additionalProperties: true,
  }),
  (req, res) => {
    sendEmail(req.body.to, req.body.subject, req.body.text);
    res.json(msgOk);
  },
);

module.exports = router;
