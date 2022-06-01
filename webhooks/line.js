const express = require('express');
const { lineMiddleware } = require('../middlewares/line');
const router = express.Router({});

router.post('/', lineMiddleware);

module.exports = router;
