import { apiService } from './api.service';

export interface CreateBookingRequest {
  customerName: string;
  email: string;
  bookingDate: string;
  bookingType: 'fullday' | 'halfday' | 'custom';
  timeSlot?: 'first_half' | 'second_half';
}

export interface BookingResponse {
  _id: string;
  customerName: string;
  email: string;
  bookingDate: string;
  bookingType: 'fullday' | 'halfday' | 'custom';
  timeSlot?: 'first_half' | 'second_half';
  createdAt: string;
  updatedAt: string;
}

export interface BookingApiResponse {
  success: boolean;
  message: string;
  data?: BookingResponse;
  errors?: Array<{
    msg: string;
    param: string;
  }>;
}

export interface BookingsListResponse {
  success: boolean;
  count: number;
  data: BookingResponse[];
}

const bookingService = apiService.injectEndpoints({
  endpoints: builder => ({
    createBooking: builder.mutation<BookingApiResponse, CreateBookingRequest>({
      query: credentials => ({
        url: '/bookings',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Booking']
    }),
    getAllBookings: builder.query<BookingsListResponse, void>({
      query: () => '/bookings',
      providesTags: ['Booking']
    }),
    getBookingsByDate: builder.query<BookingsListResponse, string>({
      query: date => `/bookings/date/${date}`,
      providesTags: ['Booking']
    })
  })
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetBookingsByDateQuery
} = bookingService;

export default bookingService;
