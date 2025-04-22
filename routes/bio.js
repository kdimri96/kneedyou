// routes/bioRoutes.js
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
 *                 example: "Hi, I'm Kshitij! I love music and coding."
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: "male"
 *               age:
 *                 type: integer
 *                 example: 28
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                     example: "Pune"
 *                   country:
 *                     type: string
 *                     example: "India"
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                         example: 18.5204
 *                       lng:
 *                         type: number
 *                         example: 73.8567
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["coding", "music", "gaming"]
 *               photos:
 *                 type: array
 *                 maxItems: 5
 *                 items:
 *                   type: string
 *                   format: uri
 *                 example: [
 *                   "https://example.com/img1.jpg",
 *                   "https://example.com/img2.jpg"
 *                 ]
 *     responses:
 *       200:
 *         description: Bio saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bio saved successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
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
 *                 user:
 *                   type: string
 *                   description: User ID reference
 *                 bio:
 *                   type: string
 *                   description: The bio text
 *                 gender:
 *                   type: string
 *                   enum: [male, female, other]
 *                 age:
 *                   type: integer
 *                 location:
 *                   type: object
 *                   properties:
 *                     city:
 *                       type: string
 *                     country:
 *                       type: string
 *                     coordinates:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: number
 *                         lng:
 *                           type: number
 *                 interests:
 *                   type: array
 *                   items:
 *                     type: string
 *                 photos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of up to 5 photo URLs
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, getBio);

module.exports = router;
