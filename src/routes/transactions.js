const express = require('express');

const router = express.Router();
const ctrl = require('../controllers/transactions');

router.get('/', ctrl.getAllTransactions);
router.post('/', ctrl.createTransaction);
router.get('/:id', ctrl.getTransaction);
router.put('/:id', ctrl.updateTransaction);
router.delete('/:id', ctrl.deleteTransaction);

module.exports = router;
