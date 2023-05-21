import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { initGA, logPageView } from "../lib/analytics";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);
  
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
