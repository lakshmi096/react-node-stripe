const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/payment', (req, res) => {
    controller.processPayment(req, res);
});

router.get('/welcome', (req, res) => {
    // res.send("hello")
    controller.processPayment(req, res);
});

module.exports = router;