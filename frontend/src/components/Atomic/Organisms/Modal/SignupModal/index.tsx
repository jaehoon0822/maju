import { signupSchema } from "@/common/validation/signup.yup";
import { Input } from "@/components/Atomic/Atoms/Inputs";
import { Modal } from "@/components/Atomic/Molecules/Modal";
import { ModalForm } from "@/components/Atomic/Molecules/ModalForm";
import useSignupModal from "@/hooks/custom/useSignupModal";
import classNames from "classnames";
import React from "react";

const SignupModal = () => {
  const { onClose, onSubmit, query, setUseFormReturnMethod } = useSignupModal();

  return (
    <div
      className={classNames("transition-all", {
        "opacity-100 visible": "signup" === query.modal,
        "opacity-0 invisible": "signup" !== query.modal,
      })}
    >
      <main>
        <Modal onClose={onClose}>
          <div
            className={classNames(
              "-mt-20 mb-10 flex flex-col items-center sm:-mt-10"
            )}
          >
            <div className={classNames("mb-4")}>
              <span
                className={classNames("text-5xl font-extrabold sm:text-3xl")}
              >
                회원가입
              </span>
              <span className={classNames("text-5xl sm:text-3xl")}>을</span>
            </div>
            <div className={classNames("mb-4")}>
              <span
                className={classNames("text-5xl font-extrabold sm:text-3xl")}
              >
                진행
              </span>
              <span className={classNames("text-5xl sm:text-3xl")}>
                해 주세요
              </span>
            </div>
          </div>
          <ModalForm
            buttonLabel="회원가입 하기"
            onSubmit={onSubmit}
            schema={signupSchema}
            setUseFormReturnMethod={setUseFormReturnMethod}
          >
            <Input
              id="email"
              label="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
            />
            <Input
              id="nick"
              label="nick"
              name="nick"
              type="nick"
              placeholder="닉네임을 입력해주세요."
            />
            <Input
              id="password"
              label="password"
              name="password"
              type="password"
              placeholder="패스워드를 입력해주세요."
            />
            <Input
              id="passwordConfirm"
              label="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="패스워드를 재확인 해주세요."
            />
          </ModalForm>
        </Modal>
      </main>
    </div>
  );
};

export default SignupModal;
