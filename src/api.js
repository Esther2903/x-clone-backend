const express = require('express');
const tweetRoute = require('./feature/tweets/tweetRouter');
const userRoute = require('./feature/users/userRoute');
const authRoute = require('./feature/auth/authRoutes');
const router = express();

router.use('/tweets', tweetRoute);
router.use('/users', userRoute);
router.use('/auths', authRoute);

module.exports = router;