import { HttpException } from "@exceptions/http.exception";
import { UnathorizedException } from "@exceptions/unathorized.exception";
import { NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
export class AuthenticateJWT {
  public static generateToken(payload: any): string {
    return jwt.sign({ token: payload }, process.env.JWT_SECRET as Secret, {
      expiresIn: 3600,
    });
  }

  public static decodeToken(token: string): any | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as Secret);
    } catch (error) {
      throw new HttpException("Error while decoding token", 500);
    }
  }
}
