import { userController } from "@/controllers/user/UserController";
import { isLoggedIn } from "@/middlewares/authentication";
import { Router } from "express";

const router = Router();

router.post("/:id/follow", isLoggedIn, userController.follow);

export { router as userRouter };
