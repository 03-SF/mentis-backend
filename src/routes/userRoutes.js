const express = require('express');
const { body, query } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roles');
const validate = require('../middleware/validate');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all students with assessment counts (Admin only)
router.get('/students', roleMiddleware('admin'), userController.getAllStudents);

// Validation rules
const updateUserValidation = [
  body('role')
    .optional()
    .isIn(['student', 'admin'])
    .withMessage('Role must be student or admin'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

const queryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('role')
    .optional()
    .isIn(['student', 'admin'])
    .withMessage('Role must be student or admin'),
  query('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

// Routes
router.get('/', roleMiddleware('admin'), queryValidation, validate, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', roleMiddleware('admin'), updateUserValidation, validate, userController.updateUser);
router.delete('/:id', roleMiddleware('admin'), userController.deleteUser);

module.exports = router;
