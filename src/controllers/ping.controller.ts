import { controller, httpGet } from "inversify-express-utils";
import PingService from "../services/ping.service";
import { Request, Response } from "express";

@controller("/ping")
class PingController {
  constructor(private readonly _pingService: PingService) {}

  @httpGet("/")
  getHelloTask(req: Request, res: Response) {
    this._pingService.consoleFromService();
    return res.json("CCC");
  }
}

export default PingController;
