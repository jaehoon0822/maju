import { isLoggedIn } from "@/middlewares/authentication";
import { likeController } from "@/controllers/like/LikeController";
import { Router } from "express";

const router = Router();

// 게시글 like user 들 router
router.get("/:id/users", isLoggedIn, likeController.getLikeUsers);
// 게시글 like user 들 router
router.get("/:id", isLoggedIn, likeController.getLikeCount);
// 게시글 좋아요 router
router.post("/:id", isLoggedIn, likeController.addLike);
// 게시글 좋아요 취소 router
router.delete("/:id", isLoggedIn, likeController.unLike);

export { router as likeRouter };
