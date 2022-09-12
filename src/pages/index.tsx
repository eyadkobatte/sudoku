import type { NextPage } from "next";
import { StoreContext } from "storeon/react";
import Head from "next/head";
import Script from "next/script";

import { store } from "../store";
import Home from "../components/Home";

const Index: NextPage = () => {
  return (
    <StoreContext.Provider value={store}>
      <Head>
        <title>Sudoku</title>
        <meta name="description" content="Sudoku - PWA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/kioskboard@2.2.0/dist/kioskboard-aio-2.2.0.min.js"
        strategy="afterInteractive"
      ></Script>

      <Home></Home>
    </StoreContext.Provider>
  );
};

export default Index;
