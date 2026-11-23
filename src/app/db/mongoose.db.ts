import { AppError } from "@/app/utils/app-error.util.js";
import { MONGO_DB_NAME, MONGO_URI } from "@/config/env.config.js";
import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: MONGO_DB_NAME,
    });

    if (!mongoose.connection.db) {
      throw new AppError("Mongo Database connection is not available", 500);
    }

    await mongoose.connection.db?.command({ ping: 1 });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to database" + error);
    throw new AppError("Failed to connect to database", 500);
  }
};

export const checkDBConnection = async (): Promise<boolean> => {
  try {
    if (!mongoose.connection.db) {
      return false;
    }
    await mongoose.connection.db?.command({ ping: 1 });
    return true;
  } catch {
    return false;
  }
};

export const disConnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.log(error);
    throw new AppError("Failed to disconnect from database", 500);
  }
};
