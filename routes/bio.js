// routes/bio.js
const express = require('express');
const { addBio, getBio } = require('../controllers/bioController');
const authMiddleware = require('../middlewares/authMiddleware'); // JWT Authentication middleware
const router = express.Router();

// POST /api/bio/add – To add or update bio
router.post('/add', authMiddleware, addBio);

// GET /api/bio – To get the user's bio
router.get('/', authMiddleware, getBio);

module.exports = router;
