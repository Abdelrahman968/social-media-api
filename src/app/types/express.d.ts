declare global {
  namespace Express {
    interface Request {
      validate?: {
        body?: any;
        query?: any;
        params?: any;
      };
    }
  }
}

export {};
