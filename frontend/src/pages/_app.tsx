import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Providers } from "@/components/common/Providers";
import { Hydrate } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Providers>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </Providers>
    </>
  );
}
