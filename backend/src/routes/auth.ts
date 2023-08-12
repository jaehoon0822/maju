import { Request, Response, Router } from "express";
import { AuthController } from "@/controllers/auth/AuthController";
import { isLoggedIn, isNotLoggedIn } from "@/middlewares/autentication";

/** @remarks - Auth 라우트 */
const router = Router();
/** @remarks AuthController 의 인스턴스 */
const auth = new AuthController();

router.post("/signup", isNotLoggedIn, auth.signUp);
router.post("/login", isNotLoggedIn, auth.login);
router.post("/logout", isLoggedIn, () => {});

export { router as auth };
