const userService = require("./userService");


exports.signup = async (req, res) => {
    console.log('Signup Request Body:', req.body);
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};