import 'express-serve-static-core';
import { Auth } from './types';

declare module 'express-serve-static-core' {
  interface Request {
    token?: Auth;
  }
}
