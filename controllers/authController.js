import { registerUser, loginUser, getUserProfile, getAllUser } from '../services/authService.js';
import { verifyToken } from '../utils/jwtUtils.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await registerUser(name, email, password, role);
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message || 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    const decoded = verifyToken(token);
    const userId = decoded?.sub;
    const user = await getUserProfile(userId);
    res.json({ message: "Success get profile", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const detail = async (req, res) => {
  try {
    const user = await getUserProfile(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const list = async (req, res) => {
  try {
    const users = await getAllUser();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};