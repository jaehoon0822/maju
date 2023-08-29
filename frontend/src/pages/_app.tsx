import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Providers } from "@/components/common/Providers";
import { Hydrate } from "@tanstack/react-query";
import PageWrapper from "@/components/common/PageWrapper";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import IsLogin from "@/components/common/IsLogin";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const paths = [];
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Providers>
        <Hydrate state={pageProps.dehydratedState}>
          {pathname === "/" ? (
            <PageWrapper>
              <Component {...pageProps} />
            </PageWrapper>
          ) : (
            <IsLogin>
              <Layout>
                <PageWrapper>
                  <Component {...pageProps} />
                </PageWrapper>
              </Layout>
            </IsLogin>
          )}
        </Hydrate>
      </Providers>
    </>
  );
}
