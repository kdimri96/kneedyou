const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bioRoutes = require('./routes/bio');
const authMiddleware = require('./middlewares/authMiddleware'); // Import the authMiddleware

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Public routes (no authentication required)
app.use('/api/auth', authRoutes);

// Protected routes (authentication required)
app.use('/api/bio', authMiddleware, bioRoutes);  // Apply authMiddleware to bio routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
