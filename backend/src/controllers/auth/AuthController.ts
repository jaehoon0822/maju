import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { ConflictError } from "@/errors/Conflict-error";
import { userService } from "@/services/User";
import passport from "passport";
import { User } from "@/entities/User";

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
    const errors = [];

    // user 검색
    const emailUser = await userService.findByEmail(email, true);
    const nickUser = await userService.findByNick(nick, true);

    // user 가 있다면 ConflictError 발생
    if (emailUser) {
      errors.push(new ConflictError("이미 존재하는 이메일입니다.", "email"));
    }
    if (nickUser) {
      errors.push(new ConflictError("이미 존재하는 닉네임입니다.", "nick"));
    }

    if (errors.length > 0) {
      throw new ConflictError().toArray(errors);
    }

    // user 가 없다면, password 해시화
    const hashedPassword = await bcrypt.hash(password, 12);

    // user 생성
    const user = await userService.create({
      email,
      password: hashedPassword,
      nick,
    });

    // 완료 response
    return res.status(201).send(user);
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
      (authError: any, user: User, info?: { message: string }) => {
        if (authError) {
          next(new ConflictError(authError.message));
        }

        if (info) {
          return next(new ConflictError(info.message));
        }

        return req.login(user, (loginError) => {
          if (loginError) {
            return next(new Error(loginError.message));
          }
          return res.status(200).send("로그인 되었되습니습다.");
          // return res.redirect("http://localhost:3000");
        });
      }
    )(req, res);
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
    res.clearCookie((req.user as User).id);

    req.logout((error) => {
      if (error) {
        throw new Error(error.message);
      }
    });
    req.session.destroy((error) => {
      if (error) {
        throw new Error(error.message);
      }
      return res.status(200).send("로그아웃 되었습니다.");
    });
  }

  async kakaoLogin(req: Request, res: Response) {
    return res.redirect("http://localhost:3000");
    // return res.status(200).send("로그인 되었습니다.");
  }

  async changePassword(req: Request, res: Response) {
    const { password, id: userId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userService.changePassword({
      password: hashedPassword,
      id: userId,
    });

    if (result?.affected !== 1) {
      throw new Error("비밀번호 변경이 되지 않았습니다.");
    }

    res.status(201).send("패스워드가 변경되었습니다.");
    try {
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async isLoggedIn(req: Request, res: Response) {
    console.log("------user", req.user);
    return res.status(200).send((req.user as User) ? true : false);
  }
}
