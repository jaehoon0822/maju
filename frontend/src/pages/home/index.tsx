import { memo } from "react";
import HomeFollowerPostContents from "@/components/Atomic/Organisms/HomeFollowerPostContents";
import HomeMyPostContents from "@/components/Atomic/Organisms/HomeMyPostContents";
import HomeTemplate from "@/components/Atomic/Templates/HomeTemplate";
import Head from "next/head";
import { useRouter } from "next/router";

const Home = () => {
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>MAJU 홈</title>
      </Head>
      <HomeTemplate>
        {query.page === "followPost" ? (
          <HomeFollowerPostContents />
        ) : (
          <HomeMyPostContents />
        )}
      </HomeTemplate>
    </>
  );
};

export default memo(Home);
