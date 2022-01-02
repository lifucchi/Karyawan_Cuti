const express = require('express');
const karyawanController = require('../controllers/karyawan');
const router = express.Router();



router.get('/', karyawanController.getKaryawan);
router.get('/add', karyawanController.getFormKaryawan);

router.post('/', karyawanController.postAddKaryawan);
router.post('/delete', karyawanController.deleteKaryawan);
router.post('/edit', karyawanController.putEditKaryawan);



module.exports = router;