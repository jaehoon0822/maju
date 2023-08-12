import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { ConflictError } from "@/errors/conflict-error";
import { userService } from "@/services/User";
import passport, { AuthenticateCallback } from "passport";

/***
 *
 *  @remarks
 *  - Auth 컨트롤러 클래스 생성
 *
 */
export class AuthController {
  /***
   *
   *  @remarks
   *  - 회원가입 로직
   *  @param req
   *  - express.Request 객체
   *  @param res
   *  - express.Response 객체
   *  @returns Promise<Response> | unefined
   *
   */
  async signUp(req: Request, res: Response) {
    // email, password 를 request.body 에서 받음
    const { email, password, nick } = req.body;

    // user 검색
    const user = await userService.find({ email });

    // user 가 있다면 ConflictError 발생
    if (user) {
      throw new ConflictError("이미 가입된 이메일입니다.");
    }

    // user 가 없다면, password 해시화
    const hashedPassword = await bcrypt.hash(password, 12);

    // user 생성
    await userService.create({
      email,
      password: hashedPassword,
      nick,
    });

    // 완료 response
    return res.status(201).send("회원가입 완료");
  }

  /**
   *
   * @remarks
   * - 로그인 로직
   * @param req
   * - express.Request 객체
   * @param res
   * - express.Response 객체
   * @returns Promise<Response> | unefined
   *
   */
  async login(req: Request, res: Response, next: NextFunction) {
    // passport
    passport.authenticate(
      "local",
      (authError: any, user: Express.User, info?: { message: string }) => {
        if (authError) {
          console.error(authError);
          throw new ConflictError(authError.message);
        }

        if (info) {
          console.error(info);
          throw new ConflictError(info.message);
        }

        return req.login(user, (loginError) => {
          if (loginError) {
            throw new Error(loginError.message);
          }
        });
      }
    )(req, res, next);
  }

  /***
   *
   * @remarks
   * - 로그아웃 로직
   * @param req
   * - express.Request 객체
   * @param res
   * - express.Response 객체
   * @returns Promise<Response> | unefined
   *
   */
  async logout(req: Request, res: Response) {
    req.logout((error) => {
      if (error) {
        throw new Error(error.message);
      }
    });
    req.session.destroy((error) => {
      if (error) {
        throw new Error(error.message);
      }
    });
    return res.status(200).send("로그아웃 되었습니다.");
  }
}
