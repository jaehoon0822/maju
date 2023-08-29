import { Modal } from "@/components/Atomic/Molecules/Modal";
import { useVerfiyModal } from "@/hooks/custom/useVerfiyModal";
import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";

const SignupComplateModal = () => {
  const { query } = useRouter();
  const { onClose } = useVerfiyModal();
  return (
    <div
      className={classNames("transition-all", {
        "opacity-100 visible": "signupComplate" === query.modal,
        "opacity-0 invisible": "signupComplate" !== query.modal,
      })}
    >
      <main>
        <Modal onClose={onClose}>
          <div
            className={classNames("flex flex-col items-center justify-center")}
          >
            <div className={classNames("mb-4")}>
              <span
                className={classNames("text-5xl font-extrabold sm:text-3xl")}
              >
                축하합니다.
              </span>
            </div>
            <div className={classNames("mb-4")}>
              <span
                className={classNames("text-5xl font-extrabold sm:text-3xl")}
              >
                회원가입
              </span>
              <span className={classNames("text-5xl sm:text-3xl")}>이</span>
            </div>
            <div className={classNames("mb-4")}>
              <span
                className={classNames("text-5xl font-extrabold sm:text-3xl")}
              >
                완료
              </span>
              <span className={classNames("text-5xl sm:text-3xl")}>
                되었어요!
              </span>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default SignupComplateModal;
