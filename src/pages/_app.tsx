import "../styles/globals.scss";
import "styles/variables.scss";
import { usePanelbear } from "@panelbear/panelbear-nextjs";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  usePanelbear("C3RJwYwdGTn", {
    scriptSrc: "/panel-bear-analytics.js",
  });

  return <Component {...pageProps} />;
}

export default MyApp;
