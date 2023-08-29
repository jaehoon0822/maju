import classNames from "classnames";
import React from "react";
import { Input } from "@/components/Atomic/Atoms/Input";
import { Modal } from "@/components/Atomic/Molecules/Modal";
import { ModalForm } from "@/components/Atomic/Molecules/ModalForm";
import { codeSchema } from "@/common/validation/code.yup";
import { useVerifyCodeModal } from "@/hooks/custom/useVerifyCodeModal";
import { useSelector } from "@/common/store";
import TextButton from "@/components/Atomic/Atoms/TextButton";

const VerifyCodeModal = () => {
  const { code } = useSelector((state) => state.verify);
  const { onClose, setUseFormReturnMethod, onSubmit, query, pathname } =
    useVerifyCodeModal();

  return (
    <div
      className={classNames("transition-all", {
        "opacity-100 visible": "verifyCode" === query.modal,
        "opacity-0 invisible": "verifyCode" !== query.modal,
      })}
    >
      <main>
        <Modal onClose={onClose}>
          {code ? (
            <>
              <div className={classNames("mb-10 flex flex-col items-center")}>
                <div className={classNames("mb-4")}>
                  <span className={classNames("text-5xl sm:text-3xl")}>
                    받은{" "}
                  </span>
                  <span
                    className={classNames(
                      "text-5xl font-extrabold sm:text-3xl"
                    )}
                  >
                    검증코드
                  </span>
                  <span className={classNames("text-5xl sm:text-3xl")}>를</span>
                </div>
                <div className={classNames("mb-4")}>
                  <span className={classNames("text-5xl sm:text-3xl")}>
                    입력해주세요.
                  </span>
                </div>
              </div>
              <ModalForm
                buttonLabel="검증하기"
                onSubmit={onSubmit}
                schema={codeSchema}
                setUseFormReturnMethod={setUseFormReturnMethod}
              >
                <Input
                  id="code"
                  label="code"
                  name="code"
                  placeholder="검증코드를 입력해주세요."
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

export { VerifyCodeModal };
