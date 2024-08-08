const express = require('express');
const userRoute = require('./feature/users/userRoute');
const authRoutes = require('./feature/auth/authRoutes');
const followershipRoute = require('./feature/followerships/followershipRoute');

const router = express();



router.use('/users', userRoute); 
router.use('/auth', authRoutes); 
router.use('/followerships', followershipRoute); 


module.exports = router; 