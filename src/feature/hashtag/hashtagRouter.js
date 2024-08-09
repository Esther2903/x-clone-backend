const express = require('express');
const hashtagController = require('./hashtagController');
const { auth } = require('../../middlewares/authMiddleware');

const hashtagRouter = express.Router();

hashtagRouter.post('/tweets/:id', auth, hashtagController.addHashtags);
hashtagRouter.get('/:name/tweets', auth, hashtagController.getTweets);

module.exports = hashtagRouter;
