import classNames from "classnames";
import { useEffect } from "react";
import Cliploader from "react-spinners/ClipLoader";
import Logo from "../../Atoms/Logo";
import { Form } from "../../Atoms/Form/Index";
import { Input } from "../../Atoms/Inputs";
import { Button } from "../../Atoms/Button";
import { loginSchema } from "@/common/validation/login.yup";
import TextButton from "../../Atoms/TextButton";
import VerifyEmailModal from "../../Organisms/Modal/VerfiyEmailModal";
import { VerifyCodeModal } from "../../Organisms/Modal/VerifyCodeModal";
import ChangePasswordModal from "../../Organisms/Modal/ChangePasswordModal";
import SignupModal from "../../Organisms/Modal/SignupModal";
import SignupComplateModal from "../../Organisms/Modal/SignupComplateModal";
import useLogin from "@/hooks/custom/useLogin";
import useQueryGetUser from "@/hooks/queries/useQueryGetUser";
import Spinner from "../../Atoms/Spinner";

const LoginTemplate = () => {
  const { onSubmit, push, query, setUseFormReturnMethod, useFormReturnMethod } =
    useLogin();
  const { data, isLoading } = useQueryGetUser();

  useEffect(() => {
    useFormReturnMethod?.reset();
    if (data) {
      push("/home");
    }
  }, [query, data]);

  if (isLoading) {
    return (
      <div>
        <Spinner isLoading={isLoading} />
      </div>
    );
  }

  return !data ? (
    <main
      className={classNames(
        "flex flex-col justify-center items-center h-screen bg-gray-100 md:bg-white"
      )}
    >
      <div
        className={classNames(
          "w-auto h-auto p-20 bg-white shadow-xl rounded-xl md:p-0 md:shadow-none"
        )}
      >
        <div
          className={classNames(
            "flex flex-col items-start w-[25rem] mb-10 sm:w-[12.5rem]"
          )}
        >
          <div className={classNames("mb-2")}>
            <span>"너와 나, 더 가까이"</span>
          </div>
          <div>
            <Logo size="XL" href="/" />
          </div>
        </div>
        <div className="mb-10">
          <Form
            onSubmit={onSubmit}
            schema={loginSchema}
            setUseFormReturnMethod={setUseFormReturnMethod}
          >
            <Input
              id="email"
              label="email"
              name="email"
              value="qqq@qqq.com"
              placeholder="이메일을 입력해주세요."
            />
            <Input
              id="password"
              label="password"
              name="password"
              value="123123123"
              placeholder="패스워드를 입력해주세요."
            />
            <Button label="로그인하기" variant="primary" size="large" />
          </Form>
        </div>
        <div className="flex justify-center w-[25rem] sm:w-[12.5rem] mb-8">
          <div className="w-[50%] h-[1px] bg-black"></div>
          <span className="-mt-3 px-4">or</span>
          <div className="w-[50%] h-[1px] bg-black"></div>
        </div>
        <div className="mb-4">
          <Button
            label="카카오 로그인"
            variant="kakao"
            size="large"
            onClick={() => {
              useFormReturnMethod?.reset();
              push("http://localhost:8080/auth/kakao");
            }}
          />
        </div>
        <div className="flex justify-end mb-10 w-[25rem] sm:w-[12.5rem]">
          <TextButton
            label="비밀번호를 잊어버리셨나요?"
            href={`/?modal=verifyEmail`}
          />
        </div>
        <div className="flex items-center justify-center w-[25rem] sm:w-[12.5rem] sm:flex-col">
          <span className="font-bold -mb-[1px] mr-4 sm:mr-0 sm:mb-2">
            회원이 아니신가요?
          </span>
          <TextButton label="지금 가입하세요" href={`/?modal=signup`} />
        </div>
      </div>
      {/* 사용할 모달들 */}
      <div>
        <VerifyEmailModal />
        <VerifyCodeModal />
        <ChangePasswordModal />
        <SignupModal />
        <SignupComplateModal />
      </div>
    </main>
  ) : null;
};

export default LoginTemplate;
