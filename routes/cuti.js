const express = require('express');
const cutiController = require('../controllers/cuti');
const router = express.Router();



router.get('/', cutiController.getCuti);


module.exports = router;