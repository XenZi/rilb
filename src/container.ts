import PingService from "./services/ping.service";
import "./controller/ping.controller";
import "./controllers/test.controller";
import { Container } from "inversify";

export const container = new Container({
  defaultScope: "Singleton",
});

container.bind(PingService).toSelf();
