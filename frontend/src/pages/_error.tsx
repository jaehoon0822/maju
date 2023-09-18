import classNames from "classnames";
import { GetStaticProps, GetStaticPropsContext, NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>MAJU 에러페이지</title>
      </Head>
      <div
        className={classNames(
          "w-full h-screen flex justify-center items-center"
        )}
      >
        <div className={classNames("flex flex-col items-center")}>
          <div className={classNames("relative w-40 h-20")}>
            <Image alt="404 이미지" src="/404.svg" fill />
          </div>
          <span className={classNames("text-gray-400 text-xl ")}>
            페이지를 찾을 수 없습니다.
          </span>
        </div>
      </div>
    </>
  );
};

const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    props: {},
  };
};

export default ErrorPage;
