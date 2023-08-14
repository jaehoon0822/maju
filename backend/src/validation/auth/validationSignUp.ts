import { body } from "express-validator";

export const validationSignup = [
  body("email").isEmail().withMessage("유효한 이메일 양식이 아닙니다."),
  body("nick")
    .isLength({ min: 2 })
    .withMessage("최소 2자 이상 작성해주세요.")
    .isLength({ max: 12 })
    .withMessage("최대 12자이하로 작성해 주세요."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("최소 8자 이상 작성해주세요.")
    .isLength({ max: 16 })
    .withMessage("최대 16자이하로 작성해 주세요."),
];
