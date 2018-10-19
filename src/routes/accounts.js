const express = require('express');

const router = express.Router();
const ctrl = require('../controllers/accounts');

router.get('/', ctrl.getAllAccounts);
router.post('/', ctrl.createAccount);
router.get('/:id', ctrl.getAccountById);

module.exports = router;
