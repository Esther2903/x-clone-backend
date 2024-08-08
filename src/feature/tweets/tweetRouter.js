const express = require('express');
const tweetController = require('./tweetController');
const upload = require('../../middlewares/upload')

const tweetRouter = express.Router();

tweetRouter.post('/', upload.single('mediaUrl'), tweetController.createTweet);

tweetRouter.get('/:id',  tweetController.getTweetById);

tweetRouter.put('/:id',  tweetController.updateTweet);

tweetRouter.delete('/:id', tweetController.deleteTweet);

tweetRouter.get('/', tweetController.getAllTweets);

module.exports = tweetRouter;
