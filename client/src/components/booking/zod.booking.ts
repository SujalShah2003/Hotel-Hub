import { z } from 'zod';

export const bookingInitialValues = {
  customerName: '',
  email: '',
  bookingDate: '' as any,
  bookingType: 'fullday' as 'fullday' | 'halfday' | 'custom',
  timeSlot: ''
};

export const bookingSchema = z
  .object({
    customerName: z
      .string({ message: 'Customer name is required' })
      .min(2, 'Name must be at least 2 characters'),
    email: z
      .string({ message: 'Email is required' })
      .email('Please enter a valid email'),
    bookingDate: z
      .string()
      .min(1, 'Booking date is required')
      .refine(
        (val) => {
          const date = new Date(val);
          return !isNaN(date.getTime());
        },
        {
          message: 'Please select a valid booking date'
        }
      ),
    bookingType: z.enum(['fullday', 'halfday', 'custom'], {
      message: 'Please select a booking type'
    }),
    timeSlot: z.string().optional()
  })
  .refine(
    data => {
      // Require timeSlot if bookingType is halfday or custom
      if (data.bookingType === 'halfday' || data.bookingType === 'custom') {
        return data.timeSlot && data.timeSlot.trim() !== '';
      }
      return true;
    },
    {
      message: 'Time slot is required for half day and custom bookings',
      path: ['timeSlot']
    }
  );

export type BookingFormType = z.infer<typeof bookingSchema>;
