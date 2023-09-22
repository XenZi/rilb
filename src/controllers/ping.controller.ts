import { controller, httpGet } from "inversify-express-utils";
import PingService from "@services/ping.service";
import { Request, Response } from "express";
import Logger from "../config/logger.config";

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Get a ping from backend
 *     description: Retrieve a ping.
 *     tags:
 *      - PingController
 *     responses:
 *       200:
 *         description: A ping from backend.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                 type: string
 *                 example: "ok"
 */
@controller("/ping")
class PingController {
  constructor(
    private readonly _pingService: PingService,
    private readonly _logger: Logger
  ) {}

  @httpGet("/")
  getHelloTask(req: Request, res: Response) {
    this._logger.info("Ping attached!");
    this._logger.debug("Debug mode");
    this._logger.error("Error mode");
    this._logger.warn("Warn mode");
    this._pingService.consoleFromService();
    return res.json("CCC");
  }
}

export default PingController;
