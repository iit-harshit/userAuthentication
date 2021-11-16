import { Application } from "express";

export default function router(app: Application) {
  app.get("/statusCheck", (req, res) => {
    return res.sendStatus(200);
  });
}
