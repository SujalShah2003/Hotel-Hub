import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Booking from '../models/Booking';
import { checkBookingConflict } from '../utils/bookingValidation';

/**
 * Create a new booking
 * POST /api/bookings
 */

export const createBooking = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { customerName, email, bookingDate, bookingType, timeSlot } = req.body;

    // Check for booking conflicts
    const conflict = await checkBookingConflict(
      new Date(bookingDate),
      bookingType,
      timeSlot
    );

    if (conflict.hasConflict) {
      return res.status(409).json({
        success: false,
        message: conflict.message || 'Booking conflict detected'
      });
    }

    // Create new booking
    const booking = new Booking({
      customerName,
      email,
      bookingDate: new Date(bookingDate),
      bookingType,
      timeSlot
    });

    await booking.save();

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get all bookings
 * GET /api/bookings
 */
export const getAllBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get bookings by date
 * GET /api/bookings/date/:date
 */
export const getBookingsByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      bookingDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings by date:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
