const express = require('express');
const MentionController = require('./mentionController');
const auth = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth , MentionController.createMention);
router.get('/:tweetId', MentionController.getMentionsByTweet);
router.get('/user', auth, MentionController.getMentionsByUser);

module.exports = router;