import { Router } from "express";
import { UserController } from "@/controllers/users-controllers";

export const usersRoutes = Router();
const userController = new UserController();

usersRoutes.post("/", userController.create);
