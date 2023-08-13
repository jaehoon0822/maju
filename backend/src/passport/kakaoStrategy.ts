import { userService } from "@/services/User";
import { PassportStatic } from "passport";
import { Strategy, Profile } from "passport-kakao";

export const kakao = (passport: PassportStatic) => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.KAKAO_ID!,
        callbackURL: "/auth/kakao/callback",
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void
      ) => {
        try {
          const user = await userService.findKakao(profile.id, "kakao");

          if (user) {
            return done(null, user);
          }

          console.log(profile);

          const newUser = await userService.createKakao({
            email: profile._json && profile._json.kakao_account.email,
            nick: profile.displayName,
            snsId: profile.id,
            provider: "kakao",
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
