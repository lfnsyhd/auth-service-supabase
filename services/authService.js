const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');

const registerUser = async (name, email, password, role = 'user') => {
  // Validate required name
  if(!name) throw new Error('Name is required');

  // Validate required email
  if(!email) throw new Error('Email is required');

  // Validate required password
  if(!password) throw new Error('Password is required');

  // Validate role
  const roles = ['user', 'admin'];
  if (!roles.includes(role)) {
    throw new Error('Invalid role');
  }

  // Validate email
  const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!validEmailRegex.test(email)) {
    throw new Error('Email must be a valid domain');
  }

  // Validate password
  const validPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  if (!validPasswordRegex.test(password)) {
    throw new Error('Password must be at least 8 characters long, alphanumeric, contain at least one uppercase letter, and no special characters');
  }

  // Validate unique email
  const check = await findUserByEmail(email);
  if (check) throw new Error('User already registered');

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role});

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
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

const getAllUser = async () => {
  const user = await User.findAll({
    where: {
      role: 'user',
    }
  });
  return user;
};

module.exports = { registerUser, loginUser, getUserProfile, getAllUser };