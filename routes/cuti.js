const express = require('express');
const cutiController = require('../controllers/cuti');
const router = express.Router();

router.get('/', cutiController.getCuti);
router.post('/', cutiController.postAddCuti);
router.post('/delete', cutiController.deleteCutiKaryawan);
router.post('/edit', cutiController.putEditCutiKaryawan);

module.exports = router;