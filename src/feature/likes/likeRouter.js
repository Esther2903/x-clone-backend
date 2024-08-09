const express = require('express');
const auth = require('../../middlewares/authMiddleware');
const likeController = require('./likeController');

const likeRouter = express.Router();

likeRouter.post('/:tweetId/like', auth, likeController.likeTweet);
likeRouter.delete('/:tweetId/unlike', auth, likeController.unlikeTweet);
likeRouter.get('/:tweetId/likes', auth, likeController.getLikesForTweet);

module.exports = likeRouter;
