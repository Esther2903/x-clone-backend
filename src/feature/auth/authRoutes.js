const express = require('express');
const authController = require('./authController.js');
const generateToken = require('../../middlewares/authMiddleware.js')

const router = express.Router();

router.post('/create/:userId', authController.createAuth);
router.get('/:userId', authController.getAuth);
router.get('/',authController.getAllAuths);
router.put('/:userId/status', authController.updateAccountStatus);
router.delete('/:userId', authController.deleteAuth);


router.post('/:userId/token', generateToken , (req , res) =>{
    res.json({ token: res.token });  // Return the generated token in response
})

module.exports = router;