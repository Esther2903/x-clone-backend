const express = require('express');
const userRoute = require('./feature/users/userRoute');
const authRoutes = require('./feature/auth/authRoutes');
const followershipRoute = require('./feature/followerships/followershipRoute');
const tweetRoute = require('./feature/tweets/tweetRouter');
const listRoute = require('./feature/lists/listRoute');

const router = express();

router.use('/users', userRoute); 
router.use('/auth', authRoutes); 
router.use('/followerships', followershipRoute); 
router.use('/tweets', tweetRoute);
router.use('/lists', listRoute);

module.exports = router; 




