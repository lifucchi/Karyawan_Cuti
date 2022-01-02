const express = require('express');
const karyawanController = require('../controllers/karyawan');
const router = express.Router();



router.get('/', karyawanController.getKaryawan);
router.post('/', karyawanController.postAddKaryawan);
router.post('/delete', karyawanController.deleteKaryawan);
router.put('/:id', karyawanController.putEditKaryawan);



module.exports = router;