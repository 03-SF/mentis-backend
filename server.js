const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (MONGODB_URI && MONGODB_URI.trim() !== '') {
      await mongoose.connect(MONGODB_URI);
      console.log('✔ MongoDB Connected');
    } else {
      console.log('⚠ MongoDB URI not provided - running without database');
      console.log('  Add MONGODB_URI to .env file to enable database');
    }
  } catch (error) {
    console.error('✖ MongoDB connection error:', error.message);
    console.log('⚠ Server will continue without database connection');
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`✔ Backend running on http://localhost:${PORT}`);
  });
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
