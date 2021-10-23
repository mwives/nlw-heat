import { Router } from "express";

import { ensureAuth } from "./middlewares/ensureAuth";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { GetUserProfileController } from "./controllers/GetUserProfileController";

export const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuth, new CreateMessageController().handle);

router.get("/messages/last3", new GetLast3MessagesController().handle);

router.get("/profile", ensureAuth, new GetUserProfileController().handle);
