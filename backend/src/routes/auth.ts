import { Request, Response, Router } from "express";
import { AuthController } from "@/controllers/auth/AuthController";

const router = Router();
/** @remarks AuthController 의 인스턴스 */
const auth = new AuthController();

router.post("/signup", auth.signUp);
router.get("/login", () => {});
router.get("/logout", () => {});

export { router as auth };
