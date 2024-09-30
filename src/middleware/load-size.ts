import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const limitPayloadSize = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const MAX_PAYLOAD_SIZE = 1024 * 1024; // 1 MB
  const contentLength = req.headers["content-length"];
  if (contentLength && Number.parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
    return res
      .status(StatusCodes.REQUEST_TOO_LONG)
      .json({ error: "Payload size exceeds the limit" });
  }
  next();
};
