import { PostController } from "./../controllers/post/PostController";
import { Router } from "express";
import { upload } from "@/middlewares/uploadMiddlware";
import { isLoggedIn } from "@/middlewares/authentication";

const router = Router();
const post = new PostController();

router.post("/img", upload.single("img"), post.createImage);
router.post("/", isLoggedIn, upload.none(), post.createPost);

export { router as post };
