const express = require('express');
const { Order } = require('../../models');
const { redisHelper } = require('../../utils/redis');
const { nanoid } = require('nanoid');
const router = express.Router();

/**
 * GET /api/example/orders
 * @tags example
 * @summary get orders of mongodb
 * @return {object} 200 - success response - application/json
 * @security BearerAuth
 */
router.get('/example/orders', (req, res) => {
  const user_id = nanoid(24);
  const sort = { created_date: -1 };
  Order.find(
    { user_id },
    {
      _id: 1,
      number: 1,
      status: 1,
      created_date: 1,
      order_sum: 1,
      payment_method: 1,
    },
    { sort },
  )
    .limit(20)
    .then((orders = []) => {
      res.json(orders);
    });
});

/**
 * GET /api/example/redis-users
 * @tags example
 * @summary get users of example dataset with redis support
 * @return {object} 200 - success response - application/json
 */
router.get('/example/redis-users', async (req, res) => {
  const key = 'redis-users';
  const value = await redisHelper.client.get(key);
  if (value) {
    res.json(JSON.parse(value));
  } else {
    return res.status(401).end();
  }
});

module.exports = router;
