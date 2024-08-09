const jwt = require('jsonwebtoken');
require('dotenv').config();


const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    
    const token = jwt.sign({ id: userId }, 
        process.env.ACCESS_TOKEN_SECRET,
         {   expiresIn: '1h'

         });
         
         req.userId = decoded.id; 
         res.token = token;
         next(); 


  
    if (!token) {
        return res.status(401).json({message: 'No token, authorization denied'});
      }
  
  
      if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
      } 

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Token is not valid'});
    }

};

module.exports = auth;            