import { userService } from "@/services/User";
import { PassportStatic } from "passport";
import { Strategy as KakaoStrategy, Profile } from "passport-kakao";

export const kakao = (passport: PassportStatic) => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID!,
        callbackURL: "/auth/kakao/callback",
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void
      ) => {
        const user = await userService.findById(profile.id);
      }
    )
  );
};
