const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const Authorization = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(24),
  },
  type: String,
  userId: String,
  token: String,
  created_date: {
    type: Date,
    default: Date.now,
  },
});

if (!mongoose.models.Authorization) {
  mongoose.model('Authorization', Authorization);
}

module.exports = mongoose.model('Authorization');
