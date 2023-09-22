import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { BaseHttpResponse } from "@models/base-http-response.model";
import { HttpException } from "@exceptions/http.exception";

@controller("/test")
class TestController {
  constructor() {}

  @httpGet('/')
  get(req: Request, res: Response) {
    throw new HttpException("Not implemented", 501);
  }
}
export default TestController;
