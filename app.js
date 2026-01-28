const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
// Enable JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Mentis AI Backend API',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const userRoutes = require('./src/routes/userRoutes');
const assessmentRoutes = require('./src/routes/assessmentRoutes');
const recommendationRoutes = require('./src/routes/recommendationRoutes');
const learningPathRoutes = require('./src/routes/learningPathRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.use('/api/learning-path', learningPathRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
