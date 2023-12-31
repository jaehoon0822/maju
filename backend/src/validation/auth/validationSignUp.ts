import { body } from "express-validator";

export const validationSignup = [
  body("email").isEmail().withMessage("유효한 이메일 양식이 아닙니다."),
  body("nick")
    .isLength({ min: 2 })
    .withMessage("최소 2자 이상 작성해주세요.")
    .isLength({ max: 10 })
    .withMessage("최대 10자이하로 작성해 주세요."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("최소 8자 이상 작성해주세요.")
    .isLength({ max: 20 })
    .withMessage("최대 20자이하로 작성해 주세요."),
];
