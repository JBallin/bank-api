const express = require('express');

const router = express.Router();
const ctrl = require('../controllers/index');

router.get('/', ctrl.sendHomePage);
router.get('/style.css', ctrl.sendCss);

module.exports = router;
