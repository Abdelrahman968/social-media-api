import { API_PREFIX } from "@/config/env.config.js";
import type { Request, Response } from "express";

export const notFoundMiddleware = (req: Request, res: Response) => {
  const body = {
    message: "Not Found",
    status: 404,
    path: req.originalUrl,
    method: req.method,
  };

  return res.status(404).json({
    success: false,
    data: body,
    prefix: API_PREFIX,
  });
};
