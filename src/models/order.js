const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const Order = new mongoose.Schema({
  _id: {
    type: String,
    default: nanoid(24),
  },
  type: {
    type: String,
  },
  number: String,
  user_id: String,
  user_name: String,
  user_email: String,
  payment_method: String,
  product_sum: Number,
  shipping_fee: Number,
  refrigeration_shipping_fee: Number,
  ori_order_sum: Number,
  order_sum: Number,
  status: {
    type: String,
    required: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

if (!mongoose.models.Order) {
  mongoose.model('Order', Order);
}

module.exports = mongoose.model('Order');
