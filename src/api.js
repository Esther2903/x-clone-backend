const express = require('express');
const userRoute = require('./feature/users/userRoute');
const authRoutes = require('./feature/auth/authRoutes');

const router = express();



router.use('/users', userRoute); 
router.use('/auth', authRoutes); 


module.exports = router; 