const express = require('express');
const userRoute = require('./feature/users/userRoute');
const authRoutes = require('./feature/auth/authRoutes');
const followershipRoute = require('./feature/followerships/followershipRoute');
const tweetRoute = require('./feature/tweets/tweetRouter');
<<<<<<< HEAD
const listRoute = require('./feature/lists/listRoute');
=======
const messageRoute = require('./feature/messages/messageRouter');
const likeRoute = require('./feature/likes/likeRouter');
const communityRoute = require('./feature/community/communityRouter');

>>>>>>> 1cc15c23164b9e58925a4749fbc57e4bfee89dad

const router = express();

router.use('/users', userRoute); 
router.use('/auth', authRoutes); 
router.use('/followerships', followershipRoute); 
router.use('/tweets', tweetRoute);
<<<<<<< HEAD
router.use('/lists', listRoute);
=======
router.use('/messages', messageRoute);
router.use('/likes', likeRoute);
router.use('/community', communityRoute);
>>>>>>> 1cc15c23164b9e58925a4749fbc57e4bfee89dad

module.exports = router; 




