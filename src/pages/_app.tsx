import Layout from "@/components/Layout";
import { IsSidebarOpenProvider, WalletConnectProvider } from "@/context";
import GoogleAnalytics from "@/GoogleAnalytics";
import "@/styles/globals.css";
import { theme } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <Head>
        <title>Lumina interface</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ChakraProvider theme={theme}>
        <IsSidebarOpenProvider>
          <WalletConnectProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WalletConnectProvider>
        </IsSidebarOpenProvider>
      </ChakraProvider>
    </>
  );
}
