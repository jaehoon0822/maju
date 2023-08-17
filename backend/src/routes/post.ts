import { PostController } from "./../controllers/post/PostController";
import { Router } from "express";
import { upload } from "@/middlewares/uploadMiddlware";
import { isLoggedIn } from "@/middlewares/authentication";

const router = Router();
const post = new PostController();

// image 생성 router
router.post("/img", upload.single("img"), post.createImage);
// 게시글 생성 router
router.post("/", isLoggedIn, upload.none(), post.createPost);
// 게시글 찾는 router
router.get("/", isLoggedIn, post.getPosts);

export { router as post };
