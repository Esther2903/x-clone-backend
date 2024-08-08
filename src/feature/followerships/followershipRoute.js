const express = require('express');
const followershipController = require('./followershipController');

const router = express.Router();


router.post('/follow' , followershipController.follow);


module.exports = router;