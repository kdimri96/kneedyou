const express = require('express');
const { addBio, getBio } = require('../controllers/bioController');
const authMiddleware = require('../middlewares/authMiddleware'); // JWT Authentication middleware
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bio
 *   description: Bio management
 */

/**
 * @swagger
 * /api/bio/add:
 *   post:
 *     summary: Add or update user bio
 *     tags: [Bio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bio
 *             properties:
 *               bio:
 *                 type: string
 *                 example: "I love hiking and coffee ☕"
 *     responses:
 *       200:
 *         description: Bio added or updated successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/add', authMiddleware, addBio);

/**
 * @swagger
 * /api/bio:
 *   get:
 *     summary: Get the current user's bio
 *     tags: [Bio]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's bio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bio:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, getBio);

module.exports = router;
