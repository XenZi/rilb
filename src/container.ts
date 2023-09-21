import PingService from "./services/ping.service";
import "./controllers/ping.controller";
import "./controllers/test.controller";
import { Container } from "inversify";
import Logger from "./config/logger.config";

export const container = new Container({
  defaultScope: "Singleton",
});

container.bind(PingService).toSelf();
container.bind(Logger).toSelf();
