import { PostController } from "./../controllers/post/PostController";
import { Router } from "express";
import { postUpload } from "@/middlewares/uploadMiddlware";
import { isLoggedIn } from "@/middlewares/authentication";

/*** @remarks - post 라우터 */
const router = Router();
const post = new PostController();

// image 생성 router
router.post("/img", isLoggedIn, postUpload.array("img"), post.createImage);
// 게시글 생성 router
router.post("/", isLoggedIn, postUpload.none(), post.createPost);
// 게시글 업데이트 router
router.put("/:id", isLoggedIn, postUpload.none(), post.updatePost);
// 해당 게시글 id 로 게시글을 찾는 router
router.get("/:id", isLoggedIn, post.getPostById);
// 해당 게시글 id 로 삭제 하는
router.delete("/:id", isLoggedIn, post.removePost);
// user 의 게시글 찾는 router
router.get("/user/:id", isLoggedIn, post.getPostsByUserId);
// 게시글 삭제 router
// 게시글의 hashtag 를 찾는 router
router.get("/get/hashtag", isLoggedIn, post.getHashtagPosts);
// follower post 를 찾는 router
router.get("/get/follower", isLoggedIn, post.getFollowerPosts);

export { router as postRouter };
