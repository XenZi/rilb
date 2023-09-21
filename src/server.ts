import express from "express";

class Server {
  private readonly _app: express.Application = express();
  private readonly _port: number = 3000;
  constructor() {}

  public get app(): express.Application {
    return this._app;
  }

  public get port(): number {
    return this._port;
  }
}

export default Server;
