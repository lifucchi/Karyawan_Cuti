const express = require('express');
const cutiController = require('../controllers/cuti');
const router = express.Router();



router.get('/', cutiController.getCuti);
router.post('/', cutiController.postAddCuti);
router.delete('/:id', cutiController.deleteCutiKaryawan);
router.put('/:id', cutiController.putEditCutiKaryawan);


module.exports = router;