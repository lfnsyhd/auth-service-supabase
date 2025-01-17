const { registerUser, loginUser, getUserProfile } = require('../services/authService');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await registerUser(username, password);
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await loginUser(username, password);
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

module.exports = { register, login, profile };