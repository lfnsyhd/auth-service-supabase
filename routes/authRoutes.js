// routes/authRoutes.js
const express = require('express');
const { register, login, profile } = require('../controllers/authController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user
 *               email:
 *                 type: string
 *                 description: The email of the new user
 *               password:
 *                 type: string
 *                 description: The password of the new user
 *     responses:
 *       201:
 *         description: Successfully created user
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Successfully logged in and returned JWT token
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []  # Indicates that the Bearer JWT token is required for this route
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's profile
 *       401:
 *         description: Unauthorized, invalid or missing JWT token
 *       500:
 *         description: Server error
 */
router.get('/profile', authenticateJWT, profile);

module.exports = router;
