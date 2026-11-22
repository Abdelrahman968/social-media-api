import  express  from 'express';
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { JSON_PAYLOAD_LIMIT, TRUSTED_ORIGINS } from "../config/env.config.js";
import { responseFormatter } from "../middleware/response/response-formatter.middleware.js";

export const app = express();

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
