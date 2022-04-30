const db = require('./db');

module.exports = () => {
  console.log('Closing db');
  db.close();
  console.log('Services are closed');
  process.exit(0);
};
