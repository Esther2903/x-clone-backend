const express = require('express');
const RetweetController = require('./retweetController');
const authHeader = require('../../middlewares/authMiddleware');

const router = express.Router();

router.use(authHeader);  // Apply middleware to all routes below it to authenticate user before processing requests.

router.post('/', RetweetController.createRetweet);
router.get('/:id', RetweetController.getRetweets);


module.exports = router;