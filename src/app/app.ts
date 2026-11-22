import express from "express";

export const app = express();

app.get("/", (_req, res) => {
  res.status(200).json({
    author: "Abdelrahman",
    message: "Social Media App API",
    date: new Date().toISOString(),
    time: new Date().toLocaleTimeString(),
    version: "1.0.0",
  });
});
