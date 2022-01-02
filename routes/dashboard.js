const express = require('express');
const dashboardController = require('../controllers/dashboard');
const router = express.Router();



router.get('/', dashboardController.getDashboard);
router.get('/sisacuti', dashboardController.getSisaCuti);
router.get('/getKaryawanCutiLebihDariSatu', dashboardController.getKaryawanCutiLebihDariSatu);


module.exports = router;