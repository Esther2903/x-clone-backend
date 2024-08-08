const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateToken = (req, res, next) => {
    const userId = req.params.userId; 

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    } 
    
    const token = jwt.sign({ id: userId }, 
        process.env.ACCESS_TOKEN_SECRET,
         {   expiresIn: '1h'

         });
         
         res.token = token;
         next(); 
};

module.exports = generateToken;            