import { userController } from "@/controllers/user/UserController";
import { isLoggedIn } from "@/middlewares/authentication";
import { Router } from "express";

const router = Router();

router.post("/:id/follow", isLoggedIn, userController.follow);
router.post("/:id/unfollow", isLoggedIn, userController.unfollow);
router.get("/follower", isLoggedIn, userController.getFollowers);
router.get("/following", isLoggedIn, userController.getFollowings);

export { router as userRouter };
