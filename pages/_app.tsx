import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  
  return (
    <>
      <Head>
        <title>Paige Braille</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
