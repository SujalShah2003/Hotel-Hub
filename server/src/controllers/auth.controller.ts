import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { SignUpInput, SignInInput, AuthResponse } from '../types/auth.types';

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, 'Validation failed', JSON.stringify(errors.array()));
    }

    const { firstname, lastname, email, password }: SignUpInput = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 409, 'User already exists with this email');
    }

    // Create new user
    const user = await User.create({
      firstName: firstname,
      lastName: lastname,
      email,
      password
    });

    // Generate JWT token
    const token = generateToken({
      id: user._id.toString(),
      email: user.email
    });

    // Prepare response
    const response: AuthResponse = {
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token
    };

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return sendSuccess(res, 201, 'User registered successfully', response);
  } catch (error: any) {
    console.error('SignUp Error:', error);
    return sendError(res, 500, 'Server error during registration', error.message);
  }
};

/**
 * @desc    Authenticate user and get token
 * @route   POST /api/auth/signin
 * @access  Public
 */
export const signIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 400, 'Validation failed', JSON.stringify(errors.array()));
    }

    const { email, password }: SignInInput = req.body;

    // Check if user exists and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken({
      id: user._id.toString(),
      email: user.email
    });

    // Prepare response
    const response: AuthResponse = {
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token
    };

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return sendSuccess(res, 200, 'Login successful', response);
  } catch (error: any) {
    console.error('SignIn Error:', error);
    return sendError(res, 500, 'Server error during login', error.message);
  }
};

/**
 * @desc    Logout user and clear cookie
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = async (_req: Request, res: Response): Promise<Response> => {
  try {
    res.clearCookie('token');
    return sendSuccess(res, 200, 'Logout successful');
  } catch (error: any) {
    console.error('Logout Error:', error);
    return sendError(res, 500, 'Server error during logout', error.message);
  }
};
