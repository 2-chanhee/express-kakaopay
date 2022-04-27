const express = require('express');
const router = express.Router();

const payment = require('./payment');

// 준비
router.post('/ready', payment.ready);

// 승인
router.post('/approve', payment.approve);

module.exports = router;
