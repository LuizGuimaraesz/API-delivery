import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/App-error";

export function errorHandling(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  response.status(500).json({ error: "Internal Server Error" });
}
