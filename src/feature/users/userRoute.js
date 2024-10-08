const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login',userController.login);
router.get('/', userController.getAllUsers);    
router.get('/:id',userController.getUser);
router.post('/reset-password', userController.resetPassword);
router.delete('/:id', userController.deleteUser);

module.exports = router;