export class AppError extends Error {
  public readonly statusCode: number;
  public readonly solution?: string | undefined;

  constructor(message: string, statusCode: number, solution?: string) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.solution = solution;

    Error.captureStackTrace(this, this.constructor);
  }
}
