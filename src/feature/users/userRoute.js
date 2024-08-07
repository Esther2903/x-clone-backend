const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.post('/signup', userController.signup);

module.exports = router;