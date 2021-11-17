import express from "express";
import config from "config";
import log from "./logger";
import { connect } from "./db/connect";
import router from "./router";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

const host = config.get("host") as string;
const port = config.get("port") as number;

app.use(express.json());

app.use(deserializeUser);

app.listen(port, host, () => {
  log.info(`Listening on http://${host}:${port}`);
  connect();
  router(app);
});
