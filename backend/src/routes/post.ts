import { PostController } from "./../controllers/post/PostController";
import { Router } from "express";
import { postUpload } from "@/middlewares/uploadMiddlware";
import { isLoggedIn } from "@/middlewares/authentication";

/*** @remarks - post 라우터*/
const router = Router();
const post = new PostController();

// image 찾는 router
router.post("/img", isLoggedIn, postUpload.array("img"), post.createImage);
// 게시물 router
router.post("/", isLoggedIn, postUpload.none(), post.createPost);
// 게시물 id 로 업데이트하는 router
router.put("/:id", isLoggedIn, postUpload.none(), post.updatePost);
// 게시물 id 로 찾는 router
router.get("/:id", isLoggedIn, post.getPostById);
// 게시물을 id 로 찾아 삭제하는 router
router.delete("/:id", isLoggedIn, post.removePost);
// 게시물을 user 의 id 로 찾는 router
router.get("/user/:id", isLoggedIn, post.getPostsByUserId);
// hashtag 로 게시물을 찾는 router
router.get("/get/hashtag", isLoggedIn, post.getHashtagPosts);
// follower post 를찾는 router
router.get("/get/follower", isLoggedIn, post.getFollowerPosts);

export { router as postRouter };
