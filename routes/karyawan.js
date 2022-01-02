const express = require('express');
const karyawanController = require('../controllers/karyawan');
const router = express.Router();



router.get('/', karyawanController.getKaryawan);
router.get('/add', karyawanController.postAddKaryawan);





module.exports = router;