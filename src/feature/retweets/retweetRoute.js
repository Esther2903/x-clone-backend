const express = require('express');
const RetweetController = require('./retweetController');
const authHeader = require('../../middlewares/authMiddleware');
const retweetController = require('./retweetController');

const router = express.Router();

router.use(authHeader);  

router.post('/', RetweetController.createRetweet);
router.get('/:id', RetweetController.getRetweets);
router.delete('/:retweetId' , RetweetController.deleteRetweet);


module.exports = router;