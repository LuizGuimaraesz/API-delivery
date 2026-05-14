import { Router } from "express";
import { SessionController } from "@/controllers/session-controller";

export const sessionRoutes = Router();

const sessionsController = new SessionController();

sessionRoutes.post("/", sessionsController.create);
