import jwt, { SignOptions } from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || 'default-secret-key';
  const expiresIn = process.env.JWT_EXPIRE || '7d';

  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const secret = process.env.JWT_SECRET || 'default-secret-key';
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};
