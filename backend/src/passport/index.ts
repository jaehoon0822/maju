import { PassportStatic } from "passport";
import { local } from "./localStrategy";
import { kakao } from "./kakaoStrategy";
import { userService } from "@/services/User";
import { User } from "@/entities/User";

export const passportConfig = (passport: PassportStatic) => {
  passport.serializeUser((user: Express.User | any, done) => {
    done(null, user.id);
  });
  passport.deserializeUser<User["id"]>(async (id, done) => {
    const user = await userService.findById(id);
    done(null, user);
  });

  local(passport);
  kakao(passport);
};
