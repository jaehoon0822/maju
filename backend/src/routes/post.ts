import { PostController } from "./../controllers/post/PostController";
import { Router } from "express";
import { upload } from "@/middlewares/uploadMiddlware";
import { isLoggedIn } from "@/middlewares/authentication";

/*** @remarks - post 라우터 */
const router = Router();
const post = new PostController();

// image 생성 router
router.post("/img", isLoggedIn, upload.single("img"), post.createImage);

// 게시글 생성 router
router.post("/", isLoggedIn, upload.none(), post.createPost);
// 게시글 업데이트 router
router.put("/:id", isLoggedIn, upload.none(), post.updatePosts);
// 해당 user 의 게시글 찾는 router
router.get("/", isLoggedIn, post.getPosts);
// 게시글 삭제 router
router.delete("/:id", isLoggedIn, post.removePost);
// 게시글의 hashtag 를 찾는 router
router.get("/hashtag", post.getHashtagPosts);
// 게시글 좋아요 router
router.post("/:id/like", isLoggedIn, post.addLike);
// 게시글 좋아요 취소 router
router.delete("/:id/like", isLoggedIn, post.unLike);

export { router as postRouter };
