const User  = require('./userModel');
console.log('User Model:', User);
const bcrypt = require ("bcrypt");

exports.createUser = async (userData) => {
    console.log('User Data:', userData);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({ ...userData, password: hashedPassword });
    return user;
};