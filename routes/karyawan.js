const express = require('express');
const karyawanController = require('../controllers/karyawan');
const router = express.Router();



router.get('/', karyawanController.getKaryawan);
router.post('/add', karyawanController.postAddKaryawan);
router.delete('/delete/:id', karyawanController.deleteKaryawan);
router.put('/edit/:id', karyawanController.putEditKaryawan);



module.exports = router;