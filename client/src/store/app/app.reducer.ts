import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '@/store/app/auth.slice.ts';

export const appReducer = combineReducers({
  auth: authSlice.reducer,
});
