import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ConflictError } from "@/errors/conflict-error";
import { userService } from "@/services/User";

export class AuthController {
  async signUp(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.find(email);

    if (user) {
      throw new ConflictError("이미 가입된 이메일입니다.");
    }

    const hash = await bcrypt.hash(password, 12);
  }
}
