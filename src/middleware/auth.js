const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    console.log('Auth middleware - Path:', req.path);
    console.log('Auth middleware - Auth header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Auth middleware - No token provided');
      return res.status(401).json({
        success: false,
        message: 'No token provided. Authorization denied.'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);
    console.log('Auth middleware - Token decoded, userId:', decoded.userId);
    
    // Find user
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log('Auth middleware - User not found:', decoded.userId);
      return res.status(401).json({
        success: false,
        message: 'User not found. Authorization denied.'
      });
    }

    console.log('Auth middleware - User authenticated:', user.email);

    // Attach user to request
    req.user = user;
    console.log('=== AUTH MIDDLEWARE DEBUG ===');
    console.log('Authenticated user:', user);
    console.log('User role:', user.role);
    console.log('============================');
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
};

module.exports = authMiddleware;
