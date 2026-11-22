import type { ErrorRequestHandler } from "express";
import { AppError } from "../../utils/app-error.util.js";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : "Internal Server Error";
  const solution = isAppError ? err.solution : undefined;

  return res.status(statusCode).json({
    success: false,
    data: {
      message,
      statusCode,
      ...(solution && { solution }),
    },
  });
};
