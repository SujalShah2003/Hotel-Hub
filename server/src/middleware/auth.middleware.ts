import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { sendError } from '../utils/response';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

/**
 * Middleware to authenticate JWT token
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    let token = req.headers.authorization?.split(' ')[1];
    
    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return sendError(res, 401, 'No token provided, authorization denied');
    }

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return sendError(res, 401, 'Invalid or expired token');
    }

    // Attach user to request object
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error('Authentication Error:', error);
    return sendError(res, 401, 'Token verification failed', error.message);
  }
};
