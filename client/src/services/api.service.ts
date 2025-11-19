import { RootState } from '@/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api',
  credentials: 'include', 
  prepareHeaders: (headers, { getState }) => {
    const token = (getState as unknown as RootState)?.app?.auth?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const apiService = createApi({
  baseQuery: baseQuery,
  tagTypes: ['Auth', 'User', 'Booking'],
  refetchOnReconnect: true,
  endpoints: () => ({})
});
