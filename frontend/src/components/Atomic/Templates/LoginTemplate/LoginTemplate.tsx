import classNames from "classnames";
import Logo from "../../Atoms/Logo";
import { Form } from "../../Atoms/Form/Index";
import { Input } from "../../Atoms/Input";
import { Button } from "../../Atoms/Button";
import { loginSchema } from "@/common/validation/login.yup";
import TextButton from "../../Atoms/TextButton";
import VerifyEmailModal from "../../Organisms/Modal/VerfiyEmailModal";
import { VerifyCodeModal } from "../../Organisms/Modal/VerifyCodeModal";
import ChangePasswordModal from "../../Organisms/Modal/ChangePasswordModal";
import { useRouter } from "next/router";

const LoginTemplate = () => {
  const { push } = useRouter();
  return (
    <main
      className={classNames(
        "flex flex-col justify-center items-center h-screen"
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
          <Logo size="XL" href="/login" />
        </div>
      </div>
      <div className="mb-10">
        <Form onSubmit={() => {}} schema={loginSchema}>
          <Input
            id="email"
            label="email"
            name="email"
            placeholder="이메일을 입력해주세요."
          />
          <Input
            id="password"
            label="password"
            name="password"
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
            push("http://localhost:8080/auth/kakao");
          }}
        />
      </div>
      <div className="flex justify-end mb-10 w-[25rem] sm:w-[12.5rem]">
        <TextButton
          label="비밀번호를 잊어버리셨나요?"
          href={`/login/?modal=verifyEmail`}
        />
      </div>
      <div className="flex items-center justify-center w-[25rem] sm:w-[12.5rem] sm:flex-col">
        <span className="font-bold -mb-[1px] mr-4 sm:mr-0 sm:mb-2">
          회원이 아니신가요?
        </span>
        <TextButton label="지금 가입하세요" href="/siginup" />
      </div>
      <div>
        <VerifyEmailModal />
        <VerifyCodeModal />
        <ChangePasswordModal />
      </div>
    </main>
  );
};

export default LoginTemplate;
