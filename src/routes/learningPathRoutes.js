const express = require('express');
const router = express.Router();
const learningPathController = require('../controllers/learningPathController');
const authMiddleware = require('../middleware/auth');

/**
 * @route   POST /api/learning-path/generate
 * @desc    Generate learning paths for a career using Gemini API
 * @access  Private
 */
router.post('/generate', authMiddleware, learningPathController.generateLearningPath);

module.exports = router;
