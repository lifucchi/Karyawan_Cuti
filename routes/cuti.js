const express = require('express');
const cutiController = require('../controllers/cuti');
const router = express.Router();

router.get('/', cutiController.getCuti);
router.get('/add', cutiController.getFormCuti);

router.post('/', cutiController.postAddCuti);
router.post('/delete', cutiController.deleteCutiKaryawan);
router.post('/edit', cutiController.putEditCutiKaryawan);
router.get('/edit', cutiController.getFormEditCutiKaryawan);

module.exports = router;