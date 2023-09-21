import { loginSchema } from "./login.yup";

describe("Yup Login Schema Test", () => {
  it("Schema 성공", async () => {
    const validData = { email: "test@test.com", password: "123qweQWE!" };
    const invalidData = { email: "", password: "" };

    await expect(loginSchema.validate(validData)).resolves.toBe(validData);
    await expect(loginSchema.validate(invalidData)).rejects.toThrowError(
      "내용을 입력해주세요."
    );
  });
});
