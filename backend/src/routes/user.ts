import { userController } from "@/controllers/user/UserController";
import { isLoggedIn } from "@/middlewares/authentication";
import {
  userAvatarUpload,
  userCoverImageUpload,
} from "@/middlewares/uploadMiddlware";
import { Router } from "express";

/** @remarks - user 라우터 */
const router = Router();

// 유저 정보 가져오기
router.get("/", isLoggedIn, userController.getUser);
// 유저id 를 통해 정보 가져오기
router.get("/:id", userController.getUserById);
// 유저닉네임을 통해 정보 가져오기
router.get("/nick/:nick", userController.getUserByNick);
// user avatar 이미지 생성 router
router.post(
  "/profile/avatar",
  userAvatarUpload.single("avatar"),
  userController.createAvatarImage
);
// user cover 이미지 생성 router
router.post(
  "/profile/coverImage",
  userCoverImageUpload.single("coverImage"),
  userController.createCoverImage
);
// profile 업데이트
router.post("/profile/update", userController.updateProfile);
// 해당 id 를 가진 유저 follow
router.post("/follow/:id", isLoggedIn, userController.follow);
// 해당 id 를 가진 유저 unfollow
router.post("/unfollow/:id", isLoggedIn, userController.unfollow);
// 현재 user 의 follwer 들
router.get("/follower", isLoggedIn, userController.getFollowers);
// 현재 user 의 follwing 들
router.get("/following", isLoggedIn, userController.getFollowings);
// 현재 user 의 password 변경요청

export { router as userRouter };
