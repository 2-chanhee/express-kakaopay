const express = require('express');
const router = express.Router();

const payment = require('./payment');

router.post('/payment', payment.kakaopay);

module.exports = router;
