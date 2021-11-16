import express from "express";
import config from "config";
import log from "./logger";
import { connect } from "./db/connect";
import router from "./router";

const app = express();

const host = config.get("host") as string;
const port = config.get("port") as number;

app.listen(port, host, () => {
  log.info(`Listening on http://${host}:${port}`);
  connect();
  router(app);
});
