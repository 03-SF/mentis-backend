const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');

const router = express.Router();

// Apply auth and admin middleware to all routes
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// Admin dashboard stats
router.get('/stats', adminController.getAdminStats);

// Get all users with assessment data
router.get('/users', adminController.getAllUsersWithData);

module.exports = router;
