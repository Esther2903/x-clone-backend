const authService = require('../auth/auth.Service');


class AuthController {
    async createAuth (req , res) {
        try {
            const userId = req.params.userId;
            const auth = await authService.createAuth(userId);
            res.status(201).json(auth);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();