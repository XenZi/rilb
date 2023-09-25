import { Container } from "inversify";
import Logger from "./config/logger.config";
import PingService from "@services/ping.service";
import { Database } from "./data-source/database.context";
import "./controllers/ping.controller";

export const container = new Container({
  defaultScope: "Singleton",
});

container.bind(PingService).toSelf();
container.bind(Logger).toSelf();
container.bind(Database).toSelf();
