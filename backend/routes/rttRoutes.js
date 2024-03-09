const express = require('express');
const router = express.Router();
const rttController = require('../controllers/rttController');

router.post('/calculer-rtt', rttController.calculerRTT);

module.exports = router;
