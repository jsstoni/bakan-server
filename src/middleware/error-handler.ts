import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const message = err.message || 'An error occurred on the server';

  res.status(StatusCodes.NOT_FOUND).json({ error: message });
};

export default errorHandler;
