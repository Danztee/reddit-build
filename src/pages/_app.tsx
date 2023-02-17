import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Reddit Build</title>
        <meta
          name="description"
          content="Reddit web application created by Olowoniyi Daniel"
        />

        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-76x76.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="https://www.redditstatic.com/desktop2x/img/favicon/favicon-96x96.png"
        />
      </Head>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
