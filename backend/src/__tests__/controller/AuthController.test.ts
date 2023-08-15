import bcrypt from "bcrypt";
import { AuthController } from "@/controllers/auth/AuthController";
import * as userService from "@/services/User";
import { Request, Response } from "express";
import { InsertResult } from "typeorm";

jest.mock("@/services/User");

const req: Request = {
  body: {
    email: "test@test.com",
    password: "123123123",
    nick: "test",
  },
} as Request;

const res: Response = {
  status: jest.fn(() => res),
  send: jest.fn(),
} as any;

describe("AuthController.ts", () => {
  //
  it("singup method 호출", async () => {
    const mockHash = "hashed-password";

    const findByEmail = jest.spyOn(userService.userService, "findByEmail");
    const create = jest.spyOn(userService.userService, "create");
    const mockBcrypt = jest.fn();
    (bcrypt.hash as jest.Mock) = mockBcrypt;
    mockBcrypt.mockResolvedValue(mockHash);

    const createReturnObj = {} as InsertResult;

    findByEmail.mockResolvedValue(null);
    create.mockResolvedValue(createReturnObj);

    const auth = new AuthController();
    await auth.signUp(req, res);

    expect(findByEmail).toHaveBeenCalledWith(req.body.email, true);

    expect(create).toHaveBeenCalledWith({
      nick: req.body.nick,
      password: mockHash,
      email: req.body.email,
    });
  });
});
