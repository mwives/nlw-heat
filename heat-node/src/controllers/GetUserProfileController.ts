import { Request, Response } from "express";
import { GetUserProfileService } from "../services/GetUserProfileService";

export class GetUserProfileController {
  async handle(req: Request, res: Response) {
    try {
      const { user_id } = req;

      const service = new GetUserProfileService();

      const user = await service.execute(user_id);

      return res.json({ user });
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
}
