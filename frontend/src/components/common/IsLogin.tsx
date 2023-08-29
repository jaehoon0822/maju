import useQueryGetUser from "@/hooks/queries/useQueryGetUser";
import TextButton from "../Atomic/Atoms/TextButton";
import Logo from "../Atomic/Atoms/Logo";
import ClipLoader from "react-spinners/ClipLoader";
import PageWrapper from "./PageWrapper";

const IsLogin = ({ children }: { children: React.ReactNode }) => {
  const { isError, isLoading } = useQueryGetUser();
  if (isLoading) {
    return (
      <PageWrapper>
        <div>
          <ClipLoader
            loading={isLoading}
            size={100}
            cssOverride={{
              display: "block",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper>
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
          </div>
        </div>
      </PageWrapper>
    );
  }

  return <div>{children}</div>;
};

export default IsLogin;
