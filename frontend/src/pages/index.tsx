import LoginTemplate from "@/components/Atomic/Templates/LoginTemplate";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>MAJU 로그인</title>
      </Head>
      <main>
        <LoginTemplate />
      </main>
    </>
  );
}
