const UserModel = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    async createUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await UserModel.create({ ...userData, password: hashedPassword });
    }

    async loginUser(email, password) {
        const user = await UserModel.findByEmail(email);
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    }

    async getUserById(id) {
        return await UserModel.findById(id);
    }

    async getAllUsers() {
        return await UserModel.findAll();
    }

    async resetPassword(email, newPassword) {
        const user = await UserModel.findByEmail(email);
        if (!user) throw new Error('User not found');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
    }
}

module.exports = new UserService();
