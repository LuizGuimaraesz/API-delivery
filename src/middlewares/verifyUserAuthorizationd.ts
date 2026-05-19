import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/App-error";

export function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Unauthorized", 404);
    }

    if (!role.includes(request.user.role)) {
      throw new AppError("Unauthorized", 404);
    }

    return next();
  };
}
