const { User } = require('../../utils/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

class UserService {
    async createUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await User.create({ ...userData, password: hashedPassword });
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async loginUser(email, password) {
        const user = await this.findByEmail(email);
        if (!user) throw new Error('User not found');
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new Error('Invalid credentials');

        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined');
        }

        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return { user, token };
    }

    async getUserById(id) {
        return await User.findByPk(id);
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async resetPassword(email, newPassword) {
        const user = await this.findByEmail(email);
        if (!user) throw new Error('User not found');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
    }

    async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        await user.destroy();
    }
}

module.exports = new UserService();
