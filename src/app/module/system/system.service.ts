import { checkDBConnection } from "@/app/db/mongoose.db.js";
import { AppError } from "@/app/utils/app-error.util.js";

export const checkConnection = async (): Promise<boolean> => {
  try {
    const isConnected = await checkDBConnection();

    if (!isConnected) {
      throw new AppError(
        "Failed to connect to database",
        503,
        "Check your database connection URI",
      );
    }

    return true;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Failed to check database connection",
      500,
      "An unexpected error occurred",
    );
  }
};
