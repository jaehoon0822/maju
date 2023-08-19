import { createRequest } from "node-mocks-http";
import * as KakaoStrategy from "passport-kakao";
import type {
  Strategy,
  StrategyOptionWithRequest,
  VerifyFunctionWithRequest,
} from "passport-kakao";

const req = createRequest();

export const mockedKakaoStratage = jest.spyOn(KakaoStrategy, "Strategy");

mockedKakaoStratage.mockImplementation(
  (
    options: StrategyOptionWithRequest,
    verify: VerifyFunctionWithRequest
  ): Strategy => {
    const profile = {
      id: "mocked-kakao-id",
      displayName: "mocked-user",
      _json: {
        kakao_account: {
          email: "mocked@test.com",
        },
      },
      provider: "kakao",
      _raw: "mocked",
    };
    verify(
      req,
      "mocked-access-token",
      "mocked-refresh-token",
      profile,
      (error, done) => {
        return done(error, { id: "mocked-id" });
      }
    );
    return new KakaoStrategy.Strategy(options, verify);
  }
);
