const express = require('express');
const { lineMiddleware } = require('../middlewares/line');
const { lineNotifyMiddleware } = require('../middlewares/line-notify');
const router = express.Router({});

router.post('/line', lineMiddleware);
router.get('/line-notify', lineNotifyMiddleware);

module.exports = router;
