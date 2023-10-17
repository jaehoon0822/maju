import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="MAJU 소셜 서비스" />
        <meta name="og:title" content="MAJU 소셜 서비스" />
        <meta name="og:description" content="당신과, 나 MAJU 보다." />
        <meta name="og:type" content="website" />
        <meta name="og:image" content="" />
        <meta name="og:url" content="http://localhost:3000" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
      </Head>
      <body
        style={{
          overflowY: "scroll",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
