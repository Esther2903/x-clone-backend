const express = require('express');
const authController = require('../auth/auth.Controller.js');

const router = express.Router();

router.post('/create/:userId', authController.createAuth);
router.get('/:userId', authController.getAuth);
router.get('/',authController.getAllAuths);
router.put('/:userId/status', authController.updateAccountStatus);
router.delete('/:userId', authController.deleteAuth);

module.exports = router;