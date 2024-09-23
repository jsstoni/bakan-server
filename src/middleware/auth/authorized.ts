import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtValidate } from './validate';

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Unauthorized: No token provided' });
    }

    const user = jwtValidate(token);

    if ('error' in user) {
      return res.status(StatusCodes.UNAUTHORIZED).json(user);
    }

    req.token = user;

    next();
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
  }
};

export default isAuthorized;
