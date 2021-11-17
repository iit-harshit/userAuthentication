import { Application } from "express";
import { protectedRouteHandler } from "./controller/protectedRoute.controller";
import { createUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateRequest from "./middleware/validateRequest";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";

export default function router(app: Application) {
  app.get("/statusCheck", (req, res) => {
    return res.sendStatus(200);
  });

  app.post(
    "/user/create",
    [validateRequest(createUserSchema)],
    createUserHandler
  );

  app.post(
    "/session/create",
    [validateRequest(createUserSessionSchema)],
    createUserSessionHandler
  );

  app.get("/protectedRoute", [requireUser], protectedRouteHandler);
}
