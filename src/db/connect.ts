import mongoose from "mongoose";
import config from "config";
import log from "../logger";

export function connect() {
  const dbUrl = config.get("dbUrl") as string;

  mongoose
    .connect(dbUrl)
    .then(() => {
      log.info("Connected to database");
    })
    .catch((err) => {
      log.error(err);
    });
}
