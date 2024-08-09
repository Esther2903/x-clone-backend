const express = require('express');
const followershipController = require('./followershipController');

const router = express.Router();


router.post('/follow' , followershipController.follow);
router.post('/unfollow', followershipController.unfollow);
router.get('/:userId/followers',followershipController.getFollowers);
router.get('/:userId/following', followershipController.getFollowing);

module.exports = router;