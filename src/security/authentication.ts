import { HttpException } from "@exceptions/http.exception";
import { UnathorizedException } from "@exceptions/unathorized.exception";
import { NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
export class AuthenticateJWT {
  public static middleware(req: Request, res: Response, next: NextFunction) {
    const token: string | null = (<any>req.headers)["authorization"] as
      | string
      | null;
    if (!token) {
      throw new UnathorizedException("You are not authorized");
    }

    try {
      const decodedJWT = jwt.verify(
        token.split("Bearer ")[1],
        process.env.JWT_SECRET as Secret
      );
      next();
    } catch (error) {
      throw new UnathorizedException("You are not authorized");
    }
  }

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
