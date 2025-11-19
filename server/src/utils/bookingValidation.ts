import Booking from "../models/Booking";

interface BookingConflict {
  hasConflict: boolean;
  message?: string;
}

export const checkBookingConflict = async (
  bookingDate: Date,
  bookingType: "fullday" | "halfday" | "custom",
  timeSlot?: "first_half" | "second_half"
): Promise<BookingConflict> => {
    
  const startOfDay = new Date(bookingDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(bookingDate);
  endOfDay.setHours(23, 59, 59, 999);

  // Find all bookings on the same date
  const existingBookings = await Booking.find({
    bookingDate: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  if (existingBookings.length === 0) {
    return { hasConflict: false };
  }

  // Check for full day bookings (blocks everything)
  const hasFullDayBooking = existingBookings.some(
    (booking) => booking.bookingType === "fullday"
  );

  if (hasFullDayBooking) {
    return {
      hasConflict: true,
      message:
        "This date is already booked for full day. No other bookings are allowed.",
    };
  }

  // If trying to book full day, check if any booking exists
  if (bookingType === "fullday") {
    return {
      hasConflict: true,
      message: `Cannot book full day. There are already ${existingBookings.length} booking(s) on this date.`,
    };
  }

  // For half day and custom bookings, check time slot conflicts
  if ((bookingType === "halfday" || bookingType === "custom") && timeSlot) {
    for (const existing of existingBookings) {
      // Check if same time slot is already booked
      if (
        (existing.bookingType === "halfday" ||
          existing.bookingType === "custom") &&
        existing.timeSlot === timeSlot
      ) {
        const slotLabel =
          timeSlot === "first_half"
            ? "First Half (9AM to 2PM)"
            : "Second Half (3PM to 7PM)";
        return {
          hasConflict: true,
          message: `${slotLabel} is already booked on this date.`,
        };
      }
    }
  }

  return { hasConflict: false };
};
