const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const assessmentController = require('../controllers/assessmentController');

// All routes require authentication
router.use(authMiddleware);

/**
 * GET /api/assessment/questions
 * Fetch all active questions (without scores)
 */
router.get('/questions', assessmentController.getQuestions);

/**
 * POST /api/assessment/submit
 * Submit assessment answers
 */
router.post('/submit', assessmentController.submitTest);

/**
 * GET /api/assessment/result
 * Get current user's latest assessment result
 */
router.get('/result', assessmentController.getResult);

/**
 * GET /api/assessment/results/all
 * Get all assessment results for current user
 */
router.get('/results/all', assessmentController.getAllResults);

/**
 * GET /api/assessment/result/:resultId
 * Get a specific assessment result by ID
 */
router.get('/result/:resultId', assessmentController.getResultById);

/**
 * DELETE /api/assessment/result/:resultId
 * Delete a specific assessment result
 */
router.delete('/result/:resultId', assessmentController.deleteResult);

module.exports = router;
