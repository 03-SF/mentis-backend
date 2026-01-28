const express = require('express');
const { body } = require('express-validator');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Validation rules
const createProfileValidation = [
  body('educationLevel')
    .optional()
    .isIn(['high-school', 'intermediate', 'bachelors', 'masters', 'phd', 'other'])
    .withMessage('Invalid education level'),
  body('subjects')
    .optional()
    .isArray()
    .withMessage('Subjects must be an array'),
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('City cannot exceed 100 characters')
];

const updateProfileValidation = [
  body('educationLevel')
    .optional()
    .isIn(['high-school', 'intermediate', 'bachelors', 'masters', 'phd', 'other'])
    .withMessage('Invalid education level'),
  body('subjects')
    .optional()
    .isArray()
    .withMessage('Subjects must be an array'),
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('City cannot exceed 100 characters'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  body('displayName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Display name cannot exceed 100 characters'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  body('phoneNumber')
    .optional()
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date'),
  body('preferences.theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Theme must be light, dark, or auto')
];

// Routes
router.post('/', createProfileValidation, validate, profileController.createProfile);
router.get('/me', profileController.getMyProfile);
router.put('/me', updateProfileValidation, validate, profileController.updateMyProfile);
router.get('/:userId', profileController.getProfileByUserId);

module.exports = router;
