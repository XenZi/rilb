import "module-alias/register";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./container";
import Logger from "config/logger.config";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
class Application {
  constructor() {}

  public listen(): void {
    const server = new InversifyExpressServer(container);
    const swaggerSpec = this.configureSwagger();
    server.setConfig((app) => {
      app.use(express.json());
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    });
    const app = server.build();

    app.listen(3000, () => {
      console.log("App running on 3000");
    });
  }

  configureSwagger() {
    const swaggerDefinition = {
      info: {
        title: "Rilb",
        version: "1.0.0",
        description: "API documentation for my RILB App",
      },
      basePath: "/",
    };
    const options = {
      swaggerDefinition,
      apis: ["./src/**/*.ts"], // Define API routes here (adjust the path as needed)
    };
    const swaggerSpec = swaggerJSDoc(options);
    return swaggerSpec;
  }
}

export default Application;
