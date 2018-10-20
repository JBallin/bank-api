const express = require('express');

const router = express.Router();
const ctrl = require('../controllers/accounts');

router.get('/', ctrl.getAllAccounts);
router.post('/', ctrl.createAccount);
router.get('/:id', ctrl.getAccountById);
router.put('/:id', ctrl.updateAccount);
router.delete('/:id', ctrl.deleteAccount);

module.exports = router;
