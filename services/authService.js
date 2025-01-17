const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');

const registerUser = async (username, password) => {
    const check = await findUserByUsername(username);
    if(check) throw new Error('User already registered');

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
      
      return user;
    } catch (error) { 
      throw new Error(error.message);
    }
};

const findUserByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user;
};

const loginUser = async (username, password) => {
    const user = await findUserByUsername(username);
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');
    
    const token = generateToken(user);
    return token;
};

const getUserProfile = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    return user;
};

module.exports = { registerUser, loginUser, getUserProfile };