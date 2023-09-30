import { UnathorizedException } from "@exceptions/unathorized.exception";
import { NextFunction } from "express";
import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
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
};
