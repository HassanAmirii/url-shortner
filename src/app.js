import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());

/*
routes mount
*/

import urlRouter from "./routes/url.routes.js";

app.use("/api", urlRouter);

/*
global error handler
*/
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // 1. Handle Mongoose/MongoDB Validation Errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // 2. Handle MongoDB Duplicate Key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    statusCode = 409;
    message = `${field} already exists.`;
  }

  // 3. Handle JWT Errors (Categorized by name)
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired.";
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.APP_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
