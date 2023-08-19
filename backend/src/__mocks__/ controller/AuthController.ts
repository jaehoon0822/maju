import bcrypt from "bcrypt";
import passport from "passport";
import { MockRequest, MockResponse } from "node-mocks-http";
import { AuthController } from "@/controllers/auth/AuthController";
import { userService } from "@/services/User";
import { User } from "@/entities/User";
import { ConflictError } from "@/errors/conflict-error";

jest.mock("bcrypt");
jest.mock("passport");
jest.mock("@/controllers/auth/AuthController");
jest.mock("@/services/User");
jest.mock("@/errors/conflict-error");
jest.mock("@/entities/User");

const { findByEmail, create } = userService;
const authController = new AuthController();

export const mockedSignUp = authController.signUp as jest.Mock;
export const mockedLogin = authController.login as jest.Mock;
export const mockedLogout = authController.logout as jest.Mock;

mockedSignUp.mockImplementation(
  async (req: MockRequest<any>, res: MockRequest<any>) => {
    const { email, password, nick } = req.body;
    const user = await findByEmail(email, true);

    if (user) {
      // ConflictError 인데 Error 로 임의로 처리
      throw new Error("이미 가입된 이메일입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await create({
      email,
      password: hashedPassword,
      nick,
    });

    return res.status(201).send("회원가입 완료");
  }
);

mockedLogin.mockImplementation(
  async (req: MockRequest<any>, res: MockResponse<any>) => {
    // passport
    passport.authenticate(
      "local",
      (authError: any, user: User, info?: { message: string }) => {
        if (authError) {
          // console.error(authError);
          throw new ConflictError(authError.message);
        }

        if (info) {
          // console.error(info);
          throw new ConflictError(info.message);
        }

        return req.login(user, (loginError: any) => {
          if (loginError) {
            throw new Error(loginError.message);
          }
          return res.status(200).send("로그인 되었습니다");
        });
      }
    )(req, res);
  }
);
