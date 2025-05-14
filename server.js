const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bioRoutes = require('./routes/bio');
const authMiddleware = require('./middlewares/authMiddleware'); // Import the authMiddleware

dotenv.config();

const app = express();
app.use(cors({
  origin: '*', // For development only. Replace '*' with specific origin in production.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public routes (no authentication required)
app.use('/api/auth', authRoutes);

// Protected routes (authentication required)
app.use('/api/bio', authMiddleware, bioRoutes);  // Apply authMiddleware to bio routes

// MongoDB connection - NON-SRV URI (replace your values)
const uri = process.env.MONGO_URI || "mongodb+srv://admin:YJWGBy2muxd42WpZ@kneedyou.biu5qze.mongodb.net/?retryWrites=true&w=majority&appName=kneedYou";

// MongoDB connection
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   retryWrites: true,
//   w: 'majority'
// }).catch(err => console.log('Connection error:', err));

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxPoolSize: 5,
  retryWrites: true,
  w: 'majority'
});

// Add these debug logs
mongoose.connection.on('connecting', () => console.log('🔄 Connecting to MongoDB...'));
mongoose.connection.on('connected', () => console.log('✅ MongoDB Connected!'));
mongoose.connection.on('error', (err) => console.error('❌ Connection Error:', err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
