import useQueryGetUser from "@/hooks/queries/useQueryGetUser";
import TextButton from "../Atomic/Atoms/TextButton";
import Logo from "../Atomic/Atoms/Logo";
import { memo, useEffect } from "react";
import Spinner from "../Atomic/Atoms/Spinner";

const IsLogin = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = useQueryGetUser();

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div>
        <Spinner isLoading={isLoading} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mb-10">
          <Logo size="XL" />
        </div>
        <div className="mb-4">
          <span className="text-4xl font-bold">로그인된 유저 </span>
          <span className="text-4xl">가 아닙니다.</span>
        </div>
        <div className="mb-10 flex">
          <span className="font-bold mr-1">MAJU</span>
          <span className="mr-2">보고 싶으시다면,</span>
          <TextButton label="로그인해주세요." href="/" />
          <span className="mr-1">이 페이지는</span>
        </div>
        <div>
          <span className="font-bold mr-2">
            5초후 로그인페이지로 이동합니다.
          </span>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default memo(IsLogin);
