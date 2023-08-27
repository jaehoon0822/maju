import classNames from "classnames";
import React from "react";
import { emailSchema } from "@/common/validation/email.yup";
import { Input } from "@/components/Atomic/Atoms/Input";
import { Modal } from "@/components/Atomic/Molecules/Modal";
import { ModalForm } from "@/components/Atomic/Molecules/ModalForm";
import { useVerifyEmailModal } from "@/hooks/custom/useVerifyEmailModal";

const VerifyEmailModal = () => {
  const { onSubmit, onClose, setUseFormReturnMethod, query, pathname } =
    useVerifyEmailModal();

  return (
    <div
      className={classNames("transition-all duration-200", {
        "opacity-100 visible": "verifyEmail" === query.modal,
        "opacity-0 invisible": "verifyEmail" !== query.modal,
      })}
    >
      <main>
        <Modal onClose={onClose}>
          <div className={classNames("mb-10 flex flex-col items-center")}>
            <div className={classNames("mb-4")}>
              <span
                className={classNames("text-5xl font-extrabold sm:text-4xl")}
              >
                검증코드
              </span>
              <span className={classNames("text-5xl sm:text-4xl")}>를</span>
            </div>
            <div className={classNames("mb-4")}>
              <span
                className={classNames("text-5xl font-extrabold sm:text-4xl")}
              >
                받을 이메일
              </span>
              <span className={classNames("text-5xl sm:text-4xl")}>을</span>
            </div>
            <div>
              <span className={classNames("text-5xl sm:text-4xl")}>
                적어주세요.
              </span>
            </div>
          </div>
          <ModalForm
            buttonLabel="다음으로 넘어가기"
            onSubmit={onSubmit}
            schema={emailSchema}
            setUseFormReturnMethod={setUseFormReturnMethod}
          >
            <Input
              id="email"
              label="email"
              name="email"
              placeholder="이메일을 입력해주세요."
            />
          </ModalForm>
        </Modal>
      </main>
    </div>
  );
};

export default VerifyEmailModal;