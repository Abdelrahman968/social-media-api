import type { Request, Response, NextFunction } from "express";

export const responseFormatter = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalJson = res.json.bind(res);

  res.json = ((body: unknown) => {
    return originalJson({
      success: true,
      data: body,
    });
  }) as Response["json"];

  next();
};
