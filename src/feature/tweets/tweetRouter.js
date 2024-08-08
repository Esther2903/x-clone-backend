const express = require('express');
const tweetController = require('./tweetController');
const upload = require('../../middlewares/upload')
const auth = require('../../middlewares/authMiddleware')

const tweetRouter = express.Router();

tweetRouter.post('/',auth, upload.single('mediaUrl'), tweetController.createTweet);

tweetRouter.get('/:id',auth,  tweetController.getTweetById);

tweetRouter.put('/:id',auth, upload.single('mediaUrl'),  tweetController.updateTweet);

tweetRouter.delete('/:id',auth, tweetController.deleteTweet);

tweetRouter.get('/', tweetController.getAllTweets);

module.exports = tweetRouter;
