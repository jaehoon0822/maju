import { Router } from "express";
import passport from "passport";
import { AuthController } from "@/controllers/auth/AuthController";
import { validationSignup } from "@/validation/auth/validationSignUp";
import { errorValidation } from "@/middlewares/error-validation";
import { isLoggedIn, isNotLoggedIn } from "@/middlewares/authentication";

/** @remarks - Auth 라우트 */
const router = Router();
/** @remarks AuthController 의 인스턴스 */
const auth = new AuthController();

/** @remarks local login service */
router.post(
  "/signup",
  isNotLoggedIn,
  validationSignup,
  errorValidation,
  auth.signUp
);

router.get("/isLoggedIn", auth.isLoggedIn);

router.post("/login", isNotLoggedIn, auth.login);
router.post("/logout", isLoggedIn, auth.logout);

/** @remarks local login service */
router.get("/kakao", isNotLoggedIn, passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  isNotLoggedIn,
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  auth.kakaoLogin
);

router.patch("/password", isNotLoggedIn, auth.changePassword);

export { router as authRouter };
