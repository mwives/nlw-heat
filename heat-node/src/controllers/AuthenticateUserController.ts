import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { code: githubCode } = req.body;

      const service = new AuthenticateUserService();
      const { user, token } = await service.execute(githubCode);

      return res.json({ user, token });
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
}
