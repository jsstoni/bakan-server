import type { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "An error occurred on the server";

  if (err instanceof z.ZodError) {
    message = err.issues.map((issue) => issue.message).join(", ");
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({ error: message });
};

export default errorHandler;
