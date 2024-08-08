const { User } = require('../../utils/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    async createUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await User.create({ ...userData, password: hashedPassword });
    }

    async loginUser(email, password) {
        console.log('Attempting to log in with email:', email);
        console.log(user);
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
       
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    }

    async getUserById(id) {
        return await User.findById(id);
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async resetPassword(email, newPassword) {
        const user = await User.findByEmail(email);
        if (!user) throw new Error('User not found');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
    }


    async deleteUser(id) {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    await user.destroy();

}
};

module.exports = new UserService();
