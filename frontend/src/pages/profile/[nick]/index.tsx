import { memo } from "react";
import ProfileTemplate from "@/components/Atomic/Templates/ProfileTemplate";
import Head from "next/head";

const Profile = () => {
  return (
    <>
      <Head>
        <title>MAJU 프로필 페이지</title>
      </Head>
      <>
        <ProfileTemplate />
      </>
    </>
  );
};

export default memo(Profile);
