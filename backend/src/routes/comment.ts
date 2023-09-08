import { isLoggedIn } from "@/middlewares/authentication";
import { commentController } from "@/controllers/comment";
import { Router } from "express";

const router = Router();

// user 의 comment 찾기
router.get("/user", isLoggedIn, commentController.findByUserId);

// user 의 comment 찾기
router.get("/:commentId", isLoggedIn, commentController.findByCommentId);

// post 의 comment 찾기
router.get("/post/:postId", isLoggedIn, commentController.findByPostId);

// post 의 commnet 생성
router.post("/post/:postId", isLoggedIn, commentController.createComment);

// post 의 comment 업데이트
router.patch("/:commentId", isLoggedIn, commentController.updateComment);

// post 의 comment delete
router.delete("/:commentId", isLoggedIn, commentController.deleteComment);

export { router as commentRouter };
