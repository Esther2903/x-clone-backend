const userService = require('./userService');
const { userSignupSchema, userLoginSchema } = require('../../validation/userValidation'); 

class UserController {
    async signup(req, res) {
        try {
            const { error } = userSignupSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details.map(err => err.message) });
            }

            const user = await userService.createUser(req.body);
            res.status(201).json({ id: user.id, email: user.email });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { error } = userLoginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details.map(err => err.message) });
            }

            const { email, password } = req.body;
            const { user, token } = await userService.loginUser(email, password);
            res.json({ id: user.id, email: user.email, token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }


    async getUser(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { email, newPassword } = req.body;
            await userService.resetPassword(email, newPassword);
            res.json({ message: 'Password reset successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteUser(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(204).send(); 
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}



module.exports = new UserController();
