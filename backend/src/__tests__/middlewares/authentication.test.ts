import { CommonError } from "@/errors/Common-error";
import { isLoggedIn, isNotLoggedIn } from "@/middlewares/authentication";
import { NextFunction } from "express";

import {
  MockRequest,
  MockResponse,
  createRequest,
  createResponse,
} from "node-mocks-http";

jest.mock("@/middlewares/authentication");

describe("authentication middleware", () => {
  let req: MockRequest<any>;
  let res: MockResponse<any>;

  beforeEach(() => {
    req = createRequest();
    res = createResponse();
  });

  it("isLoggedIn: Success", async () => {
    const mockedNext = jest.fn() as NextFunction;
    req.isAuthenticated = jest.fn(() => true);

    isLoggedIn(req, res, mockedNext);

    expect(mockedNext).toHaveBeenCalledTimes(1);
  });

  it("isLoggedIn: Error", async () => {
    const mockedNext = jest.fn() as NextFunction;
    req.isAuthenticated = jest.fn(() => false);

    try {
      isLoggedIn(req, res, mockedNext);
    } catch (err: any) {
      if (err instanceof CommonError) {
        expect(mockedNext).not.toHaveBeenCalled();
        expect(err.serializeErrors()).toEqual([
          { message: "로그인되지 않은 회원입니다." },
        ]);
      }
    }
  });

  it("isNotLoggedIn: Success", async () => {
    const mockedNext = jest.fn() as NextFunction;
    req.isAuthenticated = jest.fn(() => false);

    isNotLoggedIn(req, res, mockedNext);
    expect(mockedNext).toHaveBeenCalledTimes(1);
  });

  it("isNotLoggedIn: Error", async () => {
    const mockedNext = jest.fn() as NextFunction;
    req.isAuthenticated = jest.fn(() => true);

    try {
      isNotLoggedIn(req, res, mockedNext);
    } catch (err) {
      if (err instanceof CommonError) {
        expect(mockedNext).not.toHaveBeenCalled();
        expect(err.serializeErrors()).toEqual([
          { message: "이미 로그인된 회원입니다." },
        ]);
      }
    }
  });
});
