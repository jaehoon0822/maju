import bcrypt from "bcrypt";
import {
  MockRequest,
  MockResponse,
  createRequest,
  createResponse,
} from "node-mocks-http";
import { AuthController } from "@/controllers/auth/AuthController";
import * as userService from "@/services/User";
import { Request, Response } from "express";
import { InsertResult } from "typeorm";
import { User } from "@/entities/User";
import passport, { LogOutOptions } from "passport";
import { ConflictError } from "@/errors/conflict-error";
import { SessionData, Session } from "express-session";

jest.mock("@/services/User");

// userService 의 findByEmail Mocking
const findByEmail = jest.spyOn(userService.userService, "findByEmail");
// userService 의 create Mocking
const create = jest.spyOn(userService.userService, "create");

// Express.Request Mocking
describe("AuthController.ts", () => {
  let auth: AuthController;
  let req: MockRequest<Request>;
  let res: MockResponse<Response>;
  // user 객체
  const user = {
    id: "1",
    email: "test@test.com",
    password: "hashed-password",
    nick: "test",
    createdAt: new Date("2023-08-13 12:07:25.535"),
    updatedAt: new Date("2023-08-13 12:07:25.535"),
    provider: "",
    snsId: "",
    deletedAt: null as Date | null,
    posts: [],
    followers: [],
    followings: [],
  } as User;

  beforeEach(() => {
    // mock AuthController 의 instance
    auth = new AuthController();
    req = createRequest();
    res = createResponse();
    let test = createRequest;
  });

  /********** "singup method 호출" *********/
  req = createRequest({
    body: {
      email: "test@test.com",
      password: "123123123",
      nick: "test",
    },
  });

  // Express.Response Mocking
  res = createResponse();
  describe("signup 호출", () => {
    it("Success", async () => {
      // hash 된 password
      // mocking 된 bcrypt.hash 에 의해 parsing 된 password
      const hashedPassword = "hashed-password";

      const mockBcrypt = jest.fn();
      // bcrypt.mocking 이후 bcrypt.hash 에 할당
      (bcrypt.hash as jest.Mock) = mockBcrypt;
      // mocking 된 bcrypt.hash 에 resolve 된값 할당
      /** @returns hashedPassword */
      mockBcrypt.mockResolvedValue(hashedPassword);

      // create mock 이 반환할 값
      // InsertResult 를 단언시킴
      const createReturnObj = {} as InsertResult;

      // findByEmail mock 의 resolve 된 값 할당
      findByEmail.mockResolvedValue(null);
      // create mock 의 resolve 된 값 할당
      create.mockResolvedValue(createReturnObj);
      // auth.signup 호출
      await auth.signUp(req, res);
      // findByEmail 에 주어질 인자값 예상하여 실행
      expect(findByEmail).toHaveBeenCalledWith(req.body.email, true);
      // create 에 주어질 인자값 예상하여 실행
      expect(create).toHaveBeenCalledWith({
        nick: req.body.nick,
        password: hashedPassword,
        email: req.body.email,
      });
      expect(res._getData()).toBe("회원가입 완료");
    });

    it("Error: 이미 가입된 회원", async () => {
      // signup 실행시, findByEmail 에서 user 객체 반환
      findByEmail.mockResolvedValue(user);
      // signup 실행
      try {
        await auth.signUp(req, res);
      } catch (err: any) {
        expect(err).toBeInstanceOf(ConflictError);
        expect(err.message).toBe("이미 가입된 이메일입니다.");
      }
    });
  });

  /********** "login 호출" *********/
  describe("login 호출", () => {
    /********** "Success" *********/
    it("Success", async () => {
      req.login = (user: User, callback: any) => {
        callback(null);
      };
      req.isAuthenticated = () => true;
      // passport.authenticate 의 mock 함수 생성
      passport.authenticate = jest.fn(
        (strategy: string | string[], callback?: any) => () => {
          callback(null, user, null);
        }
      );
      // findByEmail 의 resolve 될 값 할당
      findByEmail.mockResolvedValue(user);
      // userService 의 login
      await auth.login(req, res);
      expect(req.isAuthenticated()).toBe(true);
      expect(res._getData()).toBe("로그인 되었습니다");
    });

    /********** "Error" *********/
    it("Error: user 가 존재하지 않을때", async () => {
      // req.login 의 callback 호출
      req.login = (user: User, callback: any) => {
        callback(null);
      };
      // passport.authenticate Mock 함수 선언
      passport.authenticate = jest.fn(
        (strategy: string | string[], callback?: any) => () => {
          // 1번째 인자) Error
          // Error 는 예상치 못한 Error 발생시 처리하도록 지정
          // 2번째 인자) User
          // 3번째 인자) Info
          // Info 는 예상한 Error 발생시 처리하도록 지정
          callback(null, null, {
            message: "이메일 혹은 비밀번호가 일치하지 않습니다.",
          });
        }
      );
      // findByEmail Mock 함수가 반환할 값 지정
      findByEmail.mockResolvedValue(null);
      // auth.login 에서 Error 발생시 Cathch 하기 위한
      // try-catch 문
      try {
        // auth.login 실행
        await auth.login(req, res);
      } catch (err: any) {
        // error 발생시 ConflictError 의 인스턴스인지 확인
        expect(err).toBeInstanceOf(ConflictError);
        // error 발생시 message 확인
        expect(err.message).toBe("이메일 혹은 비밀번호가 일치하지 않습니다.");
      }
    });

    it("Error: 비밀번호가 일치하지 않을때", async () => {
      // req.login 의 callback 호출
      req.login = (user: User, callback: any) => {
        callback(null);
      };
      // auth.login 내부에서 password 비교시 실행할
      // bcrypt.compare mock 함수 선언
      const mockBcryptCompare = jest.fn();
      // bcrypt.compare  에서 사용될 mock 함수 할당
      (bcrypt.compare as jest.Mock) = mockBcryptCompare;
      // bcryptCompare 에서 반환할 값 지정
      // 실패를 예상하기에 false 반환
      mockBcryptCompare.mockResolvedValue(false);
      // auth.login 실행시 error 를 받을 try-catch 문
      try {
        await auth.login(req, res);
      } catch (err: any) {
        // error 가 ConflictError 의 인스턴스인지 확인
        expect(err).toBeInstanceOf(ConflictError);
        // error message 확인
        expect(err.message).toBe("이메일 혹은 비밀번호가 일치하지 않습니다.");
      }
    });

    it("Error: 예기치 못한 Error 발생 ", async () => {
      // req.login 의 callback 호출
      req.login = (user: User, callback: any) => {
        callback(null);
      };
      passport.authenticate = jest.fn(
        (strategy: string | string[], callback?: any) => () => {
          // 1번째 인자) Error
          // Error 는 예상치 못한 Error 발생시 처리하도록 지정
          // 2번째 인자) User
          // 3번째 인자) Info
          // Info 는 예상한 Error 발생시 처리하도록 지정
          callback(new Error("Error!!!"), null, null);
        }
      );

      try {
        await auth.login(req, res);
      } catch (err: any) {
        // error 가 ConflictError 의 인스턴스인지 확인
        expect(err).toBeInstanceOf(ConflictError);
        // error message 확인
        expect(err.message).toBe("Error!!!");
      }
    });

    it("Error: req.login 에서 Error 발생", async () => {
      passport.authenticate = jest.fn(
        (strategy: string | string[], callback?: any) => () => {
          // 1번째 인자) Error
          // Error 는 예상치 못한 Error 발생시 처리하도록 지정
          // 2번째 인자) User
          // 3번째 인자) Info
          // Info 는 예상한 Error 발생시 처리하도록 지정
          callback(null, user, null);
        }
      );

      // req.login 에서 error 를 받는 로직
      // req.login 에서 발생한 error 는
      // passport.serializeUser 에서 발생한 에러로
      // 해당 에러를 req.login 에서 받은것을 가정한 테스트
      req.login = (user: User, callback: any) => {
        // serializeUser 에서 발생한 예기치 못한 에러
        callback(new Error("Session 저장 실패!"));
      };

      try {
        // auth.login 구현
        await auth.login(req, res);
      } catch (err: any) {
        // error 가 Error 의 인스턴스인지 확인
        expect(err).toBeInstanceOf(Error);
        // error message 확인
        expect(err.message).toBe("Session 저장 실패!");
      }
    });
  });
  /********** "logout 호출" *********/
  describe("logout 호출", () => {
    it("Success", async () => {
      // req.logout mock 함수
      req.logout = jest.fn();
      // req.session mock 함수
      req.session = {
        destroy: jest.fn((callback: (error?: any) => void) => {
          callback(null);
        }) as any,
      } as Session & Partial<SessionData>;

      // auth.logout 호출
      await auth.logout(req, res);
      // auth.logout 에서의 response 값 비교
      expect(res._getData()).toBe("로그아웃 되었습니다.");
    });

    it("Error: logout Error", async () => {
      // req.logout 시 error 발생시키는 Mock 함수
      req.logout = jest.fn((callback: (err: any) => void) => {
        callback(new Error("예기치 못한 에러!"));
      }) as any;

      try {
        // auth.logout 호출
        await auth.logout(req, res);
      } catch (err: any) {
        // err 가 Error 의 Instance 인지 확인
        expect(err).toBeInstanceOf(Error);
        // err.message 확인
        expect(err.message).toBe("예기치 못한 에러!");
      }
    });

    it("Error: session destroy", async () => {
      // error message
      const errorMsg = "예기치 못한 Session 에러!";
      // req.log 구현 mock 함수
      req.logout = jest.fn((callback: (err: any) => void) => {
        callback(null);
      }) as any;
      // req.session 구현 mock 함수
      req.session = {
        destroy: jest.fn((callback: (error?: any) => void) => {
          // Error 발생 처리
          callback(new Error(errorMsg));
        }) as any,
      } as Session & Partial<SessionData>;

      try {
        // auth.logout 호출
        await auth.logout(req, res);
      } catch (err: any) {
        // err 가 Error 의 Instance 인지 확인
        expect(err).toBeInstanceOf(Error);
        // err.message 확인
        expect(err.message).toBe(errorMsg);
      }
    });
  });
});
