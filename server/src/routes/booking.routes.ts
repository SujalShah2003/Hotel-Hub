import { Router } from 'express';
import { body } from 'express-validator';
import {
  createBooking,
  getAllBookings,
  getBookingsByDate
} from '../controllers/booking.controller';

const router = Router();

// Validation middleware for creating booking
const createBookingValidation = [
  body('customerName')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required')
    .isLength({ min: 2 })
    .withMessage('Customer name must be at least 2 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  
  body('bookingDate')
    .notEmpty()
    .withMessage('Booking date is required')
    .isISO8601()
    .withMessage('Please provide a valid date'),
  
  body('bookingType')
    .notEmpty()
    .withMessage('Booking type is required')
    .isIn(['fullday', 'halfday', 'custom'])
    .withMessage('Booking type must be fullday, halfday, or custom'),
  
  body('timeSlot')
    .optional({ values: 'falsy' })
    .custom((value, { req }) => {
      const bookingType = req.body.bookingType;
      
      // If fullday, timeSlot should be empty/undefined
      if (bookingType === 'fullday') {
        return true;
      }
      
      // If halfday or custom, timeSlot is required and must be valid
      if (bookingType === 'halfday' || bookingType === 'custom') {
        if (!value) {
          throw new Error('Time slot is required for halfday and custom bookings');
        }
        if (!['first_half', 'second_half'].includes(value)) {
          throw new Error('Time slot must be either first_half or second_half');
        }
      }
      
      return true;
    })
];

// Routes
router.post('/', createBookingValidation, createBooking);
router.get('/', getAllBookings);
router.get('/date/:date', getBookingsByDate);

export default router;
