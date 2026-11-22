import type { Request, Response, NextFunction } from "express";

export const responseFormatter = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalJson = res.json.bind(res);

  res.json = ((body: unknown) => {
    if (res.statusCode >= 400) {
      return originalJson(body);
    }

    return originalJson({
      success: true,
      data: body,
    });
  }) as Response["json"];

  next();
};
