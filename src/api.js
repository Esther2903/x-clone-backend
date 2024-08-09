const express = require('express');
const userRoute = require('./feature/users/userRoute');
const authRoutes = require('./feature/auth/authRoutes');
const followershipRoute = require('./feature/followerships/followershipRoute');
const tweetRoute = require('./feature/tweets/tweetRouter');

const listRoute = require('./feature/lists/listRoute');

const messageRoute = require('./feature/messages/messageRouter');
const likeRoute = require('./feature/likes/likeRouter');
const communityRoute = require('./feature/community/communityRouter');

const router = express();

router.use('/users', userRoute); 
router.use('/auth', authRoutes); 
router.use('/followerships', followershipRoute); 
router.use('/tweets', tweetRoute);

router.use('/lists', listRoute);

router.use('/messages', messageRoute);
router.use('/likes', likeRoute);
router.use('/community', communityRoute);


module.exports = router; 




