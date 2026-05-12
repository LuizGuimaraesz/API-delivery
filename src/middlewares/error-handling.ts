import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/App-error";
import { ZodError } from "zod";

export function errorHandling(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation error",
      issues: error.format(),
    });
  }
  response.status(500).json({ error: "Internal Server Error" });
}
