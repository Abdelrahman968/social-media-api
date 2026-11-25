import express, { type Application } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  API_PREFIX,
  JSON_PAYLOAD_LIMIT,
  TRUSTED_ORIGINS,
} from "@/config/env.config.js";
import { responseFormatter } from "@/app/middleware/response/response-formatter.middleware.js";
import { errorHandlerMiddleware } from "@/app/middleware/error/error-handler.middleware.js";
import { notFoundMiddleware } from "@/app/middleware/error/not-found.middleware.js";
import moduleRoutes from "@/app/module/index.js";

export const app: Application = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: TRUSTED_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.use(express.json({ limit: JSON_PAYLOAD_LIMIT }));
app.use(cookieParser());

app.use(responseFormatter);

app.get("/", (_req, res) => {
  res.status(200).json({
    author: "Abdelrahman",
    message: "Social Media App API",
    date: new Date().toISOString(),
    version: "0.1.0",
  });
});

app.use(API_PREFIX, moduleRoutes);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
