import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { logPageView } from "../lib/analytics";
import ReactGA from 'react-ga';
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

ReactGA.initialize('G-01J74RK5B9');

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
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
