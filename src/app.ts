import "module-alias/register";
import express, { NextFunction, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { ValidationException } from "@exceptions/validation.exception";
import { BaseHttpResponse } from "@models/base-http-response.model";
import { HttpException } from "@exceptions/http.exception";
import { Container } from "inversify";
import { container } from "./container";
import { Database } from "./data-source/database.context";
import { TYPE } from 'inversify-express-utils';
import Logger from "./config/logger.config";
import { UnathorizedException } from "@exceptions/unathorized.exception";


class Application {
  private readonly _container: Container;
  private readonly _logger: Logger;
  constructor() {
    this._container = container;
    this._logger = this._container.get(Logger);
  }

  public listen(): void {
    const server = new InversifyExpressServer(this._container);
    const swaggerSpec = this.configureSwagger();
    const db = this._container.get(Database);

    db.appDataSource.initialize().then(exp => {
      this._logger.info("Data source initialized");
    });

    server.setErrorConfig((app) => {
      app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        this._logger.error(err?.message);
        if (err instanceof HttpException) {
          const response = BaseHttpResponse.failed(err.message, err.statusCode);
          return res.status(response.statusCode).json(response);
        }
        if (err instanceof ValidationException) {
          const response = BaseHttpResponse.failed(err.message, 422);
          return res.status(response.statusCode).json(response);
        }
        if (err instanceof UnathorizedException) {
          const response = BaseHttpResponse.failed(err.message, 401);
          return res.status(response.statusCode).json(response);
        }
        if (err instanceof Error) {
          const response = BaseHttpResponse.failed(err.message, 500);
          return res.status(response.statusCode).json(response);
        }

        next();
      });
    });

    this.configureServer(server, swaggerSpec);
    const app = server.build();


    app.listen(process.env.port || 3000, () => {
      this._logger.info(`Server running on port ${process.env.port || 3000}`);
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

  configureServer(server: InversifyExpressServer, swaggerSpec: swaggerJSDoc.Options) {
    server.setConfig((app) => {
      app.use(express.json());
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    });
  }

  errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error('Error caught by errorHandler:', err);
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
  }
}

export default Application;
