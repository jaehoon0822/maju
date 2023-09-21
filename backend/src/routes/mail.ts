import { isNotLoggedIn } from "@/middlewares/authentication";
import { Router } from "express";
import { mailController } from "@/controllers/mail/MailController";

const router = Router();

router.post("/", isNotLoggedIn, mailController.postMail);

export { router as mailRouter };
