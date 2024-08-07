const { User } = require ("../auth/auth.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({ ...userData, password:  hashedPassword });
    return user;
};