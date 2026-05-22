import { Router } from "express";
import { usersRoutes } from "@/routes/users-routes";
import { sessionRoutes } from "./session-route";
import { deliveriesRoutes } from "./deliveries-routes";
import { deliveryLogsRoutes } from "./delivery-logs-routes";

export const routes = Router();

routes.get("/", (request, response) => {
  return response.status(200).json({
    status: "online",
    message: "API Delivery no ar!!",
  });
});

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/deliveries", deliveriesRoutes);
routes.use("/delivery-logs", deliveryLogsRoutes);
