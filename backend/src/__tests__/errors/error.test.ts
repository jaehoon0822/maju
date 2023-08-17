import { commonError } from "@/errors/common-error";
import { ConflictError } from "@/errors/conflict-error";
import { ForbiddenError } from "@/errors/forbidden-error";
import { notFoundError } from "@/errors/not-found-error";
import { RequestValidationError } from "@/errors/request-validation-error";

jest.mock("@/errors/common-error");
jest.mock("@/errors/conflict-error");
jest.mock("@/errors/forbidden-error");
jest.mock("@/errors/not-found-error");
jest.mock("@/errors/request-validation-error");

describe("ConflictError 테스트", () => {
  it("argument 없이 throw", () => {
    try {
      throw new ConflictError();
    } catch (err) {
      // CommonError 의 인스턴스인지 확인
      if (err instanceof commonError)
        // err.serializeErrors 를 사용하여 예상한 값이 맞는지 확인
        expect(err.serializeErrors()).toEqual([
          { message: "유효하지 않은 유저입니다." },
        ]);
    }
  });
  it("argument 작성후 throw", () => {
    const msg = "Manual Error!!";

    try {
      throw new ConflictError(msg);
    } catch (err) {
      // CommonError 의 인스턴스인지 확인
      if (err instanceof commonError)
        // err.serializeErrors 를 사용하여 예상한 값이 맞는지 확인
        expect(err.serializeErrors()).toEqual([{ message: msg }]);
    }
  });
});

describe("ForbiddenError 테스트", () => {
  it("argumnet 없이 throw", () => {
    try {
      throw new ForbiddenError();
    } catch (err) {
      // CommonError 의 인스턴스인지 확인
      if (err instanceof commonError)
        // err.serializeErrors 를 사용하여 예상한 값이 맞는지 확인
        expect(err.serializeErrors()).toEqual([
          { message: "웹 페이지를 볼 수 있는 권한이 없습니다." },
        ]);
    }
  });
  it("argument 작성후 throw", () => {
    const msg = "Manual Error!!";

    try {
      throw new ForbiddenError(msg);
    } catch (err) {
      // CommonError 의 인스턴스인지 확인
      if (err instanceof commonError)
        // err.serializeErrors 를 사용하여 예상한 값이 맞는지 확인
        expect(err.serializeErrors()).toEqual([{ message: msg }]);
    }
  });
});

describe("NotFoundError 테스트", () => {
  it("Error throw", () => {
    try {
      throw new notFoundError();
    } catch (err) {
      // CommonError 의 인스턴스인지 확인
      if (err instanceof commonError)
        // err.serializeErrors 를 사용하여 예상한 값이 맞는지 확인
        expect(err.serializeErrors()).toEqual([
          { message: "페이지를 찾을수 없습니다." },
        ]);
    }
  });
});

describe("RequestValidationError 테스트", () => {
  it("Error throw: err.type 이 field 일때", () => {
    try {
      // err.type 으로 field 로 설정
      throw new RequestValidationError([
        {
          type: "field",
          path: "testInput",
          msg: "TestError",
          location: "body",
          value: "TestError",
        },
      ]);
    } catch (err) {
      // CommonError 의 인스턴스인지 확인
      if (err instanceof commonError)
        // err.serializeErrors 를 사용하여 예상한 값이 맞는지 확인
        expect(err.serializeErrors()).toEqual([
          { message: "TestError", field: "testInput" },
        ]);
    }
  });

  it("Error throw: err.type 이 field 가 아닐때", () => {
    try {
      // 다른 err.type 으로 alternative 로 설정
      throw new RequestValidationError([
        {
          type: "alternative",
          msg: "TestError",
          nestedErrors: [],
        },
      ]);
    } catch (err) {
      // CommonError 의 인스턴스인지 확인
      if (err instanceof commonError)
        // err.serializeErrors 를 사용하여 예상한 값이 맞는지 확인
        expect(err.serializeErrors()).toEqual([{ message: "TestError" }]);
    }
  });
});
