import { app } from "@/app";
import request from "supertest";

describe("[POST] /auth/signup/", () => {
  it("Signup 시 데이터 없이 Request", async () => {
    // request error 시 400
    await request(app).post("/auth/signup").send({}).expect(400);
  });

  it("Signup 시 유효하지 않은 email 사용", async () => {
    // 유효한 메일 양식이 아니면 아래의 error 발생
    const errorMessage = [
      {
        message: "유효한 이메일 양식이 아닙니다.",
        field: "email",
      },
    ];

    // res 를 통해 이메일 제외하고 request
    const emptyEmailRes = await request(app).post("/auth/signup").send({
      password: "12341234",
      nick: "test",
    });

    // statusCode 확인 == 400
    expect(emptyEmailRes.statusCode).toBe(400);
    // res.body 는 errorMessage 와 같음
    expect(emptyEmailRes.body).toEqual(errorMessage);

    const invalidEmailRes = await request(app).post("/auth/signup").send({
      email: "test",
      password: "12341234",
      nick: "test",
    });

    // statusCode 확인 == 400
    expect(invalidEmailRes.statusCode).toBe(400);
    // res.body 는 errorMessage 와 같음
    expect(invalidEmailRes.body).toEqual(errorMessage);
  });

  it("Signup 시 유효하지 않은 password 사용", async () => {
    // 유효한 메일 양식이 아니면 아래의 error 발생
    const minErrorMessage = [
      {
        message: "최소 8자 이상 작성해주세요.",
        field: "password",
      },
    ];
    const maxErrorMessage = [
      {
        message: "최대 16자이하로 작성해 주세요.",
        field: "password",
      },
    ];
    // res 를 통해 이메일 제외하고 request
    const emptyPasswordRes = await request(app).post("/auth/signup").send({
      email: "test@test.com",
      password: "",
      nick: "test",
    });

    // statusCode 확인 == 400
    expect(emptyPasswordRes.statusCode).toBe(400);
    // res.body 는 minErrorMessage 와 같음
    expect(emptyPasswordRes.body).toEqual(minErrorMessage);

    // res 를 통해 이메일 제외하고 request
    const minPasswordRes = await request(app).post("/auth/signup").send({
      email: "test@test.com",
      password: "123",
      nick: "test",
    });

    // statusCode 확인 == 400
    expect(minPasswordRes.statusCode).toBe(400);
    // res.body 는 minErrorMessage 와 같음
    expect(minPasswordRes.body).toEqual(minErrorMessage);

    const maxPasswordRes = await request(app).post("/auth/signup").send({
      email: "test@test.com",
      nick: "test",
      password: "asdlfjka;lsdfkjalsdjfkaldskfj",
    });

    // statusCode 확인 == 400
    expect(maxPasswordRes.statusCode).toBe(400);
    // res.body 는 maxErrorMessage 와 같음
    expect(maxPasswordRes.body).toEqual(maxErrorMessage);
  });

  it("Signup 시 유효하지 않은 nick 사용", async () => {
    // 유효한 메일 양식이 아니면 아래의 error 발생
    const minErrorMessage = [
      {
        message: "최소 2자 이상 작성해주세요.",
        field: "nick",
      },
    ];
    const maxErrorMessage = [
      {
        message: "최대 12자이하로 작성해 주세요.",
        field: "nick",
      },
    ];

    // res 를 통해 비워있는 Nick을 request
    const emptyNickRes = await request(app).post("/auth/signup").send({
      email: "test@test.com",
      password: "12341234",
      nick: "A",
    });

    // statusCode 확인 == 400
    expect(emptyNickRes.statusCode).toBe(400);
    // res.body 는 minErrorMessage 와 같음
    expect(emptyNickRes.body).toEqual(minErrorMessage);

    // res 를 통해 Nick을 한글자만 request
    const minNickRes = await request(app).post("/auth/signup").send({
      email: "test@test.com",
      password: "12341234",
      nick: "A",
    });

    // statusCode 확인 == 400
    expect(minNickRes.statusCode).toBe(400);
    // res.body 는 minErrorMessage 와 같음
    expect(minNickRes.body).toEqual(minErrorMessage);
    // res 를 통해 12 글자 이상으로 request
    const maxNickRes = await request(app).post("/auth/signup").send({
      email: "test@test.com",
      password: "12341234",
      nick: "ThisIsNicName!!!",
    });

    // statusCode 확인 == 400
    expect(maxNickRes.statusCode).toBe(400);
    // res.body 는 minErrorMessage 와 같음
    expect(maxNickRes.body).toEqual(maxErrorMessage);
  });
});
