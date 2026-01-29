const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    // Check if MongoDB URI is provided
    if (!MONGODB_URI || MONGODB_URI.trim() === '') {
      console.log('⚠ MongoDB URI not provided - running without database');
      console.log('  Add MONGODB_URI to .env file to enable database');
      return; // Exit without throwing error
    }

    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout for serverless
      socketTimeoutMS: 45000,
      // These options are now default in Mongoose 6+
      // but included for clarity and compatibility
    });

    console.log(`✔ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('✖ Error connecting to MongoDB:', error.message);
    console.log('⚠ Server will continue without database connection');
    // Don't exit - allow server to run without DB
  }
};

module.exports = connectDB;
