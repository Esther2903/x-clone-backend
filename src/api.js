const express = require('express');
const userRoute = require('./feature/users/userRoute');
const authRoutes = require('./feature/auth/authRoutes');
const followershipRoute = require('./feature/followerships/followershipRoute');
const tweetRoute = require('./feature/tweets/tweetRouter');
const messageRoute = require('./feature/messages/messageRouter');
const likeRoute = require('./feature/likes/likeRouter');
const communityRoute = require('./feature/community/communityRouter');
const hashtagRoute = require('./feature/hashtag/hashtagRouter');

const router = express();

router.use('/users', userRoute); 
router.use('/auth', authRoutes); 
router.use('/followerships', followershipRoute); 
router.use('/tweets', tweetRoute);
router.use('/messages', messageRoute);
router.use('/likes', likeRoute);
router.use('/community', communityRoute);
router.use('/hastags', hashtagRoute);

module.exports = router; 




