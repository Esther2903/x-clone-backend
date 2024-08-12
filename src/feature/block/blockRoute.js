const express = require('express');
const BlockController = require("./blockController");


const router = express.Router();

router.post('/block', BlockController.blockUser);
router.get('/blocked' , BlockController.getBlockedUsers);


module.exports = router;