import { checkConnection } from "@/app/module/system/system.service.js";
import type { Request, Response, NextFunction } from "express";

export const dbConnection = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isConnected: boolean = await checkConnection();

    res.status(isConnected ? 200 : 503).json({
      message: isConnected
        ? "Connected to database"
        : "Not connected to database",
      date: new Date().toISOString(),
      status: isConnected ? "success" : "error",
    });
  } catch (error) {
    next(error);
  }
};
