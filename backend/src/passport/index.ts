import { PassportStatic } from "passport";
import { local } from "./localStrategy";
import { kakao } from "./kakaoStrategy";

export const passportConfig = (passport: PassportStatic) => {
  local(passport);
  kakao(passport);
};
