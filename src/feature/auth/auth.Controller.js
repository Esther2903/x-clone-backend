const authService = require('../auth/auth.Service');


exports.signup = async (req, res) => {
    try {
        const user = await authService.signup(req.body);
        res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};