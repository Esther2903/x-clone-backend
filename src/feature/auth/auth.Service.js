const AuthModel = require('./auth.Model');
const UserModel = require('../users/user.Model');
const jwt = require("jsonwebtoken");
require('dotenv').config();

class AuthService {
    async createAuth(userId) {
        const secretKey = this.generateSecretKey(); 
        if (!secretKey) throw new Error('Secret key generation failed');
        const auth = await AuthModel.create({ secretKey, userId });
        return auth;
    }

    async getAuthByUserId(userId){
        return await AuthModel.findOne({ where : {userId}});
    }

    async updateAccountStatus(userId , status ) {
        if (!auth) throw new Error('Auth record not found');

        auth.accountStatus = status;
        await auth.save();
        return auth;
    }

    async deleteAuth(userId) {
        const auth = await this.getAuthByUserId(userId);
        if (!auth) throw new Error('Auth record not found');
        await auth.destroy();
    }

    generateSecretKey(){
        const secret = process.env.ACCESS_TOKEN_SECRET;
        console.log('ACCESS_TOKEN_SECRET:', secret);
        return secret;
      
  
    }

    generateToken(userId){
        const token = jwt.sign({ id : userId},
            this.generateSecretKey(),
            {
                expiresIn:'1h'
            } );
            return token;
    }
}

module.exports = new AuthService();