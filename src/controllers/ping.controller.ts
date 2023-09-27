import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
} from "inversify-express-utils";
import PingService from "@services/ping.service";
import { Request, Response } from "express";
import Logger from "../config/logger.config";
import { AuthenticateJWT } from "@security/authentication";

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
export class PingController extends BaseHttpController {
  constructor(
    private readonly _pingService: PingService,
    private readonly _logger: Logger
  ) {
    super();
  }

  @httpGet("/")
  getHelloTask(req: Request, res: Response) {
    return res.json({
      status: "ok",
    });
  }

  @httpPost("/", AuthenticateJWT.middleware)
  async testFunc() {}
}
