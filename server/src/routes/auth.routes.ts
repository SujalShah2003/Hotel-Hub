import { Router } from 'express';
import { body } from 'express-validator';
import { signUp, signIn, logout } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */

router.post(
  '/signup',
  [
    body('firstname')
      .trim()
      .notEmpty()
      .withMessage('First name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('First name must be between 2 and 50 characters'),
    body('lastname')
      .trim()
      .notEmpty()
      .withMessage('Last name is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name must be between 2 and 50 characters'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 15 })
      .withMessage('Password must be between 8 and 15 characters')
      .matches(/[a-z]/)
      .withMessage('Password must contain a lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password must contain an uppercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain a number')
      .matches(/[@#%&!$*]/)
      .withMessage('Password must contain a special character (@,#,%,&,!,$,*)'),
    body('confirmpwd')
      .notEmpty()
      .withMessage('Confirm password is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      })
  ],
  signUp
);

/**
 * @route   POST /api/auth/signin
 * @desc    Login user
 * @access  Public
 */
router.post(
  '/signin',
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 50 })
      .withMessage('Password must be between 8 and 50 characters')
  ],
  signIn
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authenticate, logout);

export default router;
