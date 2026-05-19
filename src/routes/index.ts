import { Router } from "express";
import { usersRoutes } from "@/routes/users-routes";
import { sessionRoutes } from "./session-route";
import { deliveriesRoutes } from "./deliveries-routes";

export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/deliveries", deliveriesRoutes);
