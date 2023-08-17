import { isLoggedIn } from "@/middlewares/authentication";
import { Router } from "express";

const router = Router();

router.get("/:id/follow", isLoggedIn, () => {
  try {
    const { id } =
    const user = await;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
});

export { router as userRouter };
