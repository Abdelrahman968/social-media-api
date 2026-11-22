import { app } from "./app/app.js";

const PORT = 3000;

const startServer = async (): Promise<void> => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Express Server is running on http://localhost:${PORT}`);
    });

    const shutdown = async (signal: string): Promise<void> => {
      console.log(`${signal} received. Shutting down gracefully...`);

      server.close((err) => {
        if (err) {
          console.error("Error occurred while closing the server:", err);
          process.exitCode = 1;
        } else {
          console.log("Server closed successfully.");
          process.exit();
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
