import TextButton from "../Atomic/Atoms/TextButton";
import Logo from "../Atomic/Atoms/Logo";
import { memo, useEffect } from "react";
import Spinner from "../Atomic/Atoms/Spinner";
import { useRouter } from "next/router";
import useQueryGetIsLoggedIn from "@/hooks/queries/useQueryGetIsLoggedIn";
import Layout from "../Layout";
import classNames from "classnames";

const IsLogin = ({ children }: { children: React.ReactNode }) => {
  const { pathname, ...router } = useRouter();
  const { data: isLoggedIn, isLoading } = useQueryGetIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn && pathname === "/") {
      window.location.href = "/home";
    }

    if (!isLoggedIn && pathname !== "/") {
      const timeoutId = setTimeout(() => {
        window.location.href = "/";
      }, 5000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [pathname, isLoggedIn]);

  if (isLoading) {
    return (
      <div
        className={classNames(
          "fixed w-full h-full flex justify-center items-center"
        )}
      >
        <Spinner isLoading={isLoading} />
      </div>
    );
  }

  if (isLoggedIn && pathname !== "/") {
    return (
      <>
        <Layout>{children}</Layout>
      </>
    );
  }

  if (!isLoggedIn && pathname !== "/") {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mb-10">
          <Logo size="XL" />
        </div>
        <div className="mb-4">
          <span className="text-4xl sm:text-xl font-bold">로그인된 유저 </span>
          <span className="text-4xl sm:text-xl">가 아닙니다.</span>
        </div>
        <div className="mb-10 flex sm:text-sm sm:flex-col">
          <div>
            <span className="font-bold mr-1">MAJU</span>
            <span className="mr-2">보고 싶으시다면,</span>
          </div>
          <TextButton label="로그인해주세요." href="/" />
        </div>
        <div className="flex sm:flex-col sm:text-sm sm:items-center">
          <span className="block mr-1">이 페이지는</span>
          <span className="block font-bold mr-2">
            5초후 로그인페이지로 이동합니다.
          </span>
        </div>
      </div>
    );
  }

  return children;
};

export default memo(IsLogin);
