const mongoose = require('mongoose');

// Cache connection for serverless
let cachedConnection = null;

const connectDB = async () => {
  // Return cached connection if it exists
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✔ Using cached MongoDB connection');
    return cachedConnection;
  }

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
      maxPoolSize: 10,
      minPoolSize: 2,
      // These options are now default in Mongoose 6+
      // but included for clarity and compatibility
    });

    console.log(`✔ MongoDB Connected: ${conn.connection.host}`);
    cachedConnection = conn;
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      cachedConnection = null;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      cachedConnection = null;
    });

    return conn;

  } catch (error) {
    console.error('✖ Error connecting to MongoDB:', error.message);
    cachedConnection = null;
    throw error; // Throw error to prevent server from starting without DB
  }
};

module.exports = connectDB;
