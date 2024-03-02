import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Paige Braille</title>
      </Head>
      <ToastContainer position="bottom-center" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
