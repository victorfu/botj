const express = require('express');
const { lineNotifyMiddleware } = require('../middlewares/line-notify');
const { zohoMiddleware } = require('../middlewares/zoho');
const router = express.Router({});

router.get('/line-notify', lineNotifyMiddleware);
router.post('/zoho', zohoMiddleware);

module.exports = router;
