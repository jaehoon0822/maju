import { isLoggedIn } from "@/middlewares/authentication";
import Router from "express";

const router = Router();

// commnetId 로 reply 를 찾는 라우터
router.get("/:commentId", isLoggedIn);
