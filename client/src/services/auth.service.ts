import { apiService } from '@/services/api.service';

// Types for API requests and responses
export interface SignUpRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpwd: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    token: string;
  };
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: string;
}

const authService = apiService.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation<AuthResponse, SignUpRequest>({
      query: credentials => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Auth']
    }),
    signIn: build.mutation<AuthResponse, SignInRequest>({
      query: credentials => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Auth']
    }),
    logout: build.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      invalidatesTags: ['Auth']
    })
  })
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } =
  authService;
