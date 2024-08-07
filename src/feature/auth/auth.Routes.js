const express = require('express');
const authController = require('../auth/auth.Controller.js');

const router = express.Router();

router.post('/signup', authController.signup);

module.exports = router;