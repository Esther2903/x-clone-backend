const userService = require("./userService");


exports.signup = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.login = async (req , res) => {
    try {
        const {email , password} = req.body;
        const user = await userService.loginUser(email, password);
        res.json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        await userService.resetPassword(email, newPassword);
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};