import { userService } from "./../services/User";
import bcrypt from "bcrypt";
import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";

/**
 * passport local strategy 생성
 *
 * @param passport
 * 패스포트 타입
 *
 */
export const local = (passport: PassportStatic) => {
  // passport.use 를 사용하여 localStrategy 실행
  passport.use(
    new LocalStrategy(
      {
        // field 설정
        usernameField: "email", // req.body.email
        passwordField: "password", // req.body.password
      },
      // Stragegy 유효성 검사
      /**
       *
       * @param email
       *  이메일 필드
       * @param password
       *  패스워드 필드
       * @param done
       *  done(error, user: user | undefined | false, verify: IVerifyOptions | undefined)
       *
       */
      async (email, password, done) => {
        try {
          // user 가 있는지 확인
          const user = await userService.findByEmail(email, true);

          // user 가 없다면 done 으로 error message 전달
          if (!user) {
            return done(null, false, {
              message: "이메일 혹은 비밀번호가 일치하지 않습니다",
            });
          }

          // password 를 비교하여 맞으면 result 에 저장
          const result = await bcrypt.compare(password, user?.password);

          // result 가 없다면 done 으로 error message 전달
          if (!result) {
            return done(null, false, {
              message: "이메일 혹은 비밀번호가 일치하지 않습니다",
            });
          }

          // user 가 유효하다면 done 으로 user 전달
          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
