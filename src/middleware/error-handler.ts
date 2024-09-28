import type { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let message = err.message || "An error occurred on the server";
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  if (err instanceof z.ZodError) {
    message = err.issues.map((issue) => issue.message).join(", ");
    statusCode = StatusCodes.BAD_REQUEST;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({ error: message });
};

export default errorHandler;
