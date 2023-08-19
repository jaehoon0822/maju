import { PassportStatic } from "passport";
import { local } from "./localStrategy";
import { kakao } from "./kakaoStrategy";
import { userService } from "@/services/User";
import { User } from "@/entities/User";

const sessionUser: { [id: string]: User } | null = {};
export const passportConfig = (passport: PassportStatic) => {
  // passport.login 시 user 를 serializeUser 로 보냄
  passport.serializeUser((user: Express.User | any, done) => {
    try {
      // 받은 user 를 express.session 에 저장 // session 에 user.id 를 저장
      return done(null, user.id); // <-- session 저장
    } catch (error) {
      return done(error);
    }
  });
  // 이후 매 요청마다 cookie 의 session.id 를
  // deserializeUser 에서 받아 처리
  passport.deserializeUser<User["id"]>(async (id, done) => {
    // session 에 있는 user.id 를 가져옴
    try {
      if (sessionUser[id]) {
        return done(null, sessionUser[id]);
      }
      // user.id 를 사용하여 user 정보 find
      const user = await userService.findByIdWithFollow(id);

      sessionUser[user!.id] = user!;
      // 찾은 user 정보를 req.user 에 저장
      return done(null, user); // <-- req.user 에 저장
    } catch (error) {
      if (error instanceof Error) {
        // error 발생시 500 발생처리
        throw new Error(error.message);
      }
    }
  });

  local(passport);
  kakao(passport);
};
