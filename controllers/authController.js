const { registerUser, loginUser, getUserProfile, getAllUser } = require('../services/authService');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await registerUser(name, email, password, role);
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const detail = async (req, res) => {
  try {
    const user = await getUserProfile(req.params.id);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const user = await getAllUser();
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, profile, detail, list };