import TextButton from "@/components/Atomic/Atoms/TextButton";
import { Modal } from "@/components/Atomic/Molecules/Modal";
import { useVerfiyModal } from "@/hooks/custom/useVerfiyModal";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";

const SignupComplateModal = ({
  isSignup,
  setIsSignup,
}: {
  isSignup: boolean;
  setIsSignup: Dispatch<SetStateAction<boolean>>;
}) => {
  console.log(isSignup);
  // query string 을 얻기위한 query 가져오기
  const { query } = useRouter();
  // 공용으로 사용가능한 virifyModal 에서 onClose 함수 가져오기
  const { onClose } = useVerfiyModal();
  // signup 되었는지 확인

  return (
    // query.modal 이 signupComplate 이면 화면에 보여줌, 아니면 보여주지 않음
    <div
      className={classNames("transition-all", {
        "opacity-100 visible": "signupComplate" === query.modal,
        "opacity-0 invisible": "signupComplate" !== query.modal,
      })}
    >
      <main>
        {/* 
          modal onClose 실행시 isSignup 을 false 로 변경 
          -> 이전에 signup 진행되지 않았으면, 접근못하게 막도록 처리함
        */}
        <Modal
          onClose={() => {
            setIsSignup(false);
            onClose();
          }}
        >
          {/* query.userId 가 있고, isSignup 이 true 이어야 활성화*/}
          {query.userId && isSignup ? (
            <div
              className={classNames(
                "flex flex-col items-center justify-center"
              )}
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
              <div>
                <TextButton
                  label="프로필 설정하러가기"
                  href={`/?modal=registProfile&userId=${query.userId}`}
                />
              </div>
            </div>
          ) : (
            // query.userId 가 없거나 isSignup 이 false 이면 회원가입 유도 문구 활성화
            <>
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
                  먼저
                </span>
                <span className={classNames("text-5xl sm:text-3xl")}>
                  진행해주세요!
                </span>
              </div>
              <div>
                <TextButton label="회원가입 하러가기" href={`/?modal=signup`} />
              </div>
            </>
          )}
        </Modal>
      </main>
    </div>
  );
};

export default SignupComplateModal;
