const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const recommendationController = require('../controllers/recommendationController');

// All routes require authentication
router.use(authMiddleware);

/**
 * GET /api/recommendation
 * Get current user's career recommendation
 */
router.get('/', recommendationController.getRecommendation);

/**
 * GET /api/recommendation/all
 * Get all recommendations (Admin only)
 */
router.get('/all', recommendationController.getAllRecommendations);

/**
 * GET /api/recommendation/:userId
 * Get specific user's recommendation
 */
router.get('/:userId', recommendationController.getRecommendation);

module.exports = router;
