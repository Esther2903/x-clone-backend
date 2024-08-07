const User  = require('./userModel');
const bcrypt = require ("bcrypt");

exports.createUser = async (userData) => {
    console.log('User Data:', userData);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({ ...userData, password: hashedPassword });
    return user;
};

exports.getAllUsers = async () => {
    return User.findAll();
}
/*
exports.loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return user;
};




exports.getUserById = async (id) => {
    return User.findByPk(id);
};
*/