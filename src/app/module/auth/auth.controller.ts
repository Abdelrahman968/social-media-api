import { registerService } from "@/app/module/auth/auth.service.js";
import type { NextFunction, Request, Response } from "express";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await registerService(req.validate?.body);
    res.status(201).json({
      message: "User created successfully",
      user: result,
    });
  } catch (error) {
    next(error);
  }
};
