const express = require('express');
const BookmarkController = require('./bookmarkController');
const authHeader = require('../../middlewares/authMiddleware');

const router = express.Router();

router.use(authHeader);  

router.post('/', BookmarkController.createBookmark);
router.get('/user/:userId', BookmarkController.getBookmarksByUser);
router.get('/tweet/:tweetId', BookmarkController.getBookmarksByTweet);
router.delete('/:userId/:tweetId', BookmarkController.deleteBookmark);

module.exports = router;
