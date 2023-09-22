import "module-alias/register";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./container";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { ValidationException } from "@exceptions/validation.exception";
import { BaseHttpResponse } from "@models/base-http-response.model";
import { HttpException } from "@exceptions/http.exception";
class Application {
  constructor() {}

  public listen(): void {
    const server = new InversifyExpressServer(container);
    const swaggerSpec = this.configureSwagger();
    server.setConfig((app) => {
      app.use(express.json());
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    });
    server.setErrorConfig((app) => {
      app.use((err: any, req: any, res: any, next: any) => {
        if (err instanceof HttpException) {
          const response = BaseHttpResponse.failed(err.message, err.statusCode);
          return res.status(response.statusCode).json(response);
        }
        if (err instanceof ValidationException) {
          const response = BaseHttpResponse.failed(err.message, 422);
          return res.status(response.statusCode).json(response);
        }

        if (err instanceof Error) {
          const response = BaseHttpResponse.failed(err.message, 500);
          return res.status(response.statusCode).json(response);
        }

        next();
      });
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
      apis: ["./src/**/*.ts"],
    };
    const swaggerSpec = swaggerJSDoc(options);
    return swaggerSpec;
  }
}

export default Application;
