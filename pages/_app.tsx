// pages/_app.tsx

import { Wrapper } from "@/components/Wrapper";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Paige Braille</title>
      </Head>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
}

export default MyApp;
