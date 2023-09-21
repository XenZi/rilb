import "module-alias/register";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./container";

class Application {
  constructor() {}

  public listen(): void {
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(express.json());
    });

    const app = server.build();

    app.listen(3000, () => {
      console.log("Server rrunning onn: 3000");
    });
  }
}

export default Application;
