const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const Appointment = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(24),
  },
  lineUserId: String,
  datetime: String,
  event: Object,
  status: {
    type: String,
    required: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

if (!mongoose.models.Appointment) {
  mongoose.model('Appointment', Appointment);
}

module.exports = mongoose.model('Appointment');
