import { Router } from "express";
import { AuthController } from "@/controllers/auth/AuthController";

const router = Router();
const auth = new AuthController();

router.get("/singup", auth.signUp);
router.get("/login", () => {});
router.get("/logout", () => {});
