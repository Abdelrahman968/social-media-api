import { app } from "@/app/app.js";
import { connectDB, disConnectDB } from "@/app/db/mongoose.db.js";
import { PORT } from "@/config/env.config.js";

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Express Server is running on http://localhost:${PORT}`);
    });

    const shutdown = async (signal: string): Promise<void> => {
      console.log(`${signal} received. Shutting down gracefully...`);

      server.close(async (err) => {
        if (err) {
          console.error("Error occurred while closing the server:", err);
          process.exitCode = 1;
        } else {
          const results = await Promise.allSettled([disConnectDB()]);

          results.forEach((result) => {
            if (result.status === "rejected") {
              console.log("Shutdown error", result.reason);
            }
          });

          process.exit(
            results.some((result) => result.status === "rejected") ? 1 : 0,
          );
        }
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
