import express, { NextFunction, Request, Response } from "express";
import Logger from "src/config/logger.config";
import { container } from "src/container";
import { BaseHttpResponse } from "@models/base-http-response.model";
import { HttpException } from "@exceptions/http.exception";
import { ValidationException } from "@exceptions/validation.exception";
import { UnathorizedException } from "@exceptions/unathorized.exception";
import { HttpStatus } from "@enums/http-status.enum";

const logger: Logger = container.get(Logger);

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  if (err instanceof HttpException) {
    const response = BaseHttpResponse.failed(err.message, err.statusCode);
    return res.status(response.statusCode).json(response);
  }
  if (err instanceof ValidationException) {
    const response = BaseHttpResponse.failed(
      err.message,
      HttpStatus.UNPROCESSABLE_ENTITY
    );
    return res.status(response.statusCode).json(response);
  }
  if (err instanceof UnathorizedException) {
    const response = BaseHttpResponse.failed(
      err.message,
      HttpStatus.UNAUTHORIZED
    );
    return res.status(response.statusCode).json(response);
  }
  if (err instanceof Error) {
    const response = BaseHttpResponse.failed(
      err.message,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    return res.status(response.statusCode).json(response);
  }

  next();
};
