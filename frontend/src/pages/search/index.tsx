import React, { memo } from "react";
import Head from "next/head";
import SearchTemplate from "@/components/Atomic/Templates/SearchTemplate";

const Search = () => {
  return (
    <>
      <Head>
        <title>MAJU 검색 페이지</title>
      </Head>
      <SearchTemplate />
    </>
  );
};

export default memo(Search);
