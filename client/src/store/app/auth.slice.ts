import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type IAuthSlice = {
  token: string | null;
  user: IUser | null;
  isLoggedIn: boolean;
};

const initialState: IAuthSlice = {
  token: null,
  user: null,
  isLoggedIn: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_AUTH_DATA: (
      state,
      action: PayloadAction<{ token: string; user: IUser }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    CLEAR_AUTH_DATA: state => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    }
  }
});

export const { SET_AUTH_DATA, CLEAR_AUTH_DATA } = authSlice.actions;

export const GET_AUTH_CONFIG = (state: RootState) => state.app.auth;
