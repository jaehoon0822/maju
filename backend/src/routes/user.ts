import { userController } from "@/controllers/user/UserController";
import { isLoggedIn } from "@/middlewares/authentication";
import { Router } from "express";

/** @remarks - user 라우터 */
const router = Router();

// 유저 비밀번호 변경요청
router.post("/:id/unfollow", isLoggedIn, userController.unfollow);
// 해당 id 를 가진 유저 follow
router.post("/:id/follow", isLoggedIn, userController.follow);
// 해당 id 를 가진 유저 unfollow
router.post("/:id/unfollow", isLoggedIn, userController.unfollow);
// 현재 user 의 follwer 들
router.get("/follower", isLoggedIn, userController.getFollowers);
// 현재 user 의 follwing 들
router.get("/following", isLoggedIn, userController.getFollowings);
// 현재 user 의 password 변경요청

export { router as userRouter };
