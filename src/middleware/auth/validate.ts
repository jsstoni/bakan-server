import { JWT_SECRET } from '@/lib/env';
import jwt from 'jsonwebtoken';
import { Auth, ErrorAuth } from './types';

export const jwtValidate = (token: string): Auth | ErrorAuth => {
  try {
    const decode = jwt.verify(token, JWT_SECRET) as Auth;

    return decode;
  } catch (_error) {
    return { error: 'Unauthorized Invalid token' };
  }
};
