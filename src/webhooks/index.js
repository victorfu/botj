const express = require('express');
const { lineMiddleware } = require('../middlewares/line');
const router = express.Router({});

router.post('/line', lineMiddleware);

module.exports = router;
