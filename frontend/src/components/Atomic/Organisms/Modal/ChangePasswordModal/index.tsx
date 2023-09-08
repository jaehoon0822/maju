import { passwordSchema } from "@/common/validation/password.yup";
import { Input } from "@/components/Atomic/Atoms/Inputs";
import TextButton from "@/components/Atomic/Atoms/TextButton";
import { Modal } from "@/components/Atomic/Molecules/Modal";
import { ModalForm } from "@/components/Atomic/Molecules/ModalForm";
import useChangePasswordModal from "@/hooks/custom/useChangePasswordModal";
import classNames from "classnames";
import React from "react";

const ChangePasswordModal = () => {
  const { onClose, setUseFormReturnMethod, onSubmit, query, userId, pathname } =
    useChangePasswordModal();
  return (
    <div
      className={classNames("transition-all", {
        "opacity-100 visible": "changePassword" === query.modal,
        "opacity-0 invisible": "changePassword" !== query.modal,
      })}
    >
      <main>
        <Modal onClose={onClose}>
          {userId ? (
            <>
              <div className={classNames("mb-10 flex flex-col items-center")}>
                <div className={classNames("mb-4")}>
                  <span
                    className={classNames(
                      "text-5xl font-extrabold sm:text-3xl"
                    )}
                  >
                    패스워드
                  </span>
                  <span className={classNames("text-5xl sm:text-3xl")}>를</span>
                </div>
                <div className={classNames("mb-4")}>
                  <span
                    className={classNames(
                      "text-5xl font-extrabold sm:text-3xl"
                    )}
                  >
                    변경
                  </span>
                  <span className={classNames("text-5xl sm:text-3xl")}>
                    해 주세요
                  </span>
                </div>
              </div>
              <ModalForm
                buttonLabel="패스워드 변경하기"
                onSubmit={onSubmit}
                schema={passwordSchema}
                setUseFormReturnMethod={setUseFormReturnMethod}
              >
                <Input
                  id="password"
                  label="password"
                  name="password"
                  placeholder="패스워드를 입력해주세요."
                />
                <Input
                  id="passwordConfirm"
                  label="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="패스워드를 재확인 해주세요."
                />
              </ModalForm>
            </>
          ) : (
            <div
              className={classNames("mb-10 mt-10 flex flex-col items-center")}
            >
              <div className={classNames("mb-4")}>
                <span
                  className={classNames("text-5xl font-extrabold sm:text-4xl")}
                >
                  이메일 검증
                </span>
                <span className={classNames("text-5xl sm:text-4xl")}>이</span>
              </div>
              <div className={classNames("mb-10")}>
                <span className={classNames("text-5xl sm:text-4xl")}>
                  되지 않았습니다.
                </span>
              </div>
              <div className={classNames("mb-4")}>
                <TextButton
                  label="이메일 검증하러 가기"
                  href={`${pathname}?modal=verifyEmail`}
                />
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
};

export default ChangePasswordModal;
