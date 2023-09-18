import React from "react";
import Logo from "../Logo";
import { useRouter } from "next/router";
import classNames from "classnames";
import TextButton from "../TextButton";

const Ban = () => {
  const { back } = useRouter();
  return (
    <div className="flex flex-col justify-center items-center bg-white w-[40rem] p-20 md:w-[80vw] md:-mx-10 ">
      <div className="mb-10">
        <Logo size="XL" onClick={() => back()} />
      </div>
      <div className="flex flex-col mb-4">
        <span className="text-2xl font-bold text-center text-rose-500">
          해당 게시물의
        </span>
        <span className="text-2xl text-center text-gray-500">
          소유자가 아닙니다.
        </span>
        <div className={classNames("text-center pt-8")}>
          <TextButton
            label="뒤로가기"
            onClick={() => {
              back();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Ban;
