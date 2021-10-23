import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw new Error("Token missing.");
    }

    const token = authToken.split(" ")[1];

    const { sub } = verify(token, process.env.JWT_SECRET as Secret) as IPayload;

    req.user_id = sub;

    return next();
  } catch (err) {
    throw new Error("Token expired.");
  }
}
