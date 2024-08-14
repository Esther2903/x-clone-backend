const express = require('express');
const tweetController = require('./tweetController');
const {uploadMedia} = require('../../middlewares/upload')
const auth = require('../../middlewares/authMiddleware')

const tweetRouter = express.Router();

tweetRouter.post('/',auth, uploadMedia.single('mediaUrl'), tweetController.createTweet);
tweetRouter.post('/twet/reply/',auth, uploadMedia.single('mediaUrl'), tweetController.createReply);
tweetRouter.post('/twet/quote/',auth, uploadMedia.single('mediaUrl'), tweetController.createQuote);

tweetRouter.get('/comment/:id',auth, tweetController.getCommentsForTweet);

tweetRouter.get('/:id',auth,  tweetController.getTweetById);

tweetRouter.put('/:id',auth, uploadMedia.single('mediaUrl'),  tweetController.updateTweet);

tweetRouter.delete('/:id',auth, tweetController.deleteTweet);

tweetRouter.get('/', tweetController.getAllTweets);

module.exports = tweetRouter;
