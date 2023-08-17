import { isLoggedIn } from "@/middlewares/authentication";
import { Router } from "express";

const router = Router();

router.get("/:id/follow", isLoggedIn, () => {});

export { router as userRouter };
