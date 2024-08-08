const express = require('express');
const authController = require('./authController.js');

const router = express.Router();

router.post('/create/:userId', authController.createAuth);
router.get('/:userId', authController.getAuth);

module.exports = router;