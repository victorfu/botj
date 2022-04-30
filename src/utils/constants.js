const ValidateProps = {
  doc: {
    note: { type: 'string', minLength: 1, maxLength: 1000 },
  },
  email: {
    to: { type: 'string', minLength: 1, maxLength: 100 },
    subject: { type: 'string', minLength: 1, maxLength: 256 },
    text: { type: 'string', minLength: 1, maxLength: 1000 },
  },
};


const msgOk = 'ok';

module.exports = {
  ValidateProps,
  msgOk
};
