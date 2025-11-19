import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  customerName: string;
  email: string;
  bookingDate: Date;
  bookingType: 'fullday' | 'halfday' | 'custom';
  timeSlot?: 'first_half' | 'second_half';
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      minlength: [2, 'Customer name must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    bookingDate: {
      type: Date,
      required: [true, 'Booking date is required']
    },
    bookingType: {
      type: String,
      required: [true, 'Booking type is required'],
      enum: {
        values: ['fullday', 'halfday', 'custom'],
        message: 'Booking type must be either fullday, halfday, or custom'
      }
    },
    timeSlot: {
      type: String,
      enum: {
        values: ['first_half', 'second_half'],
        message: 'Time slot must be either first_half or second_half'
      },
      required: function(this: IBooking) {
        return this.bookingType === 'halfday' || this.bookingType === 'custom';
      }
    }
  },
  {
    timestamps: true
  }
);

// Index for efficient querying by date
bookingSchema.index({ bookingDate: 1 });

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
