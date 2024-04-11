import Layout from "@/components/Layout";
import { IsSidebarOpenProvider } from "@/context";
// import GoogleAnalytics from "@/GoogleAnalytics";
import "@/styles/globals.css";
import { theme } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null} */}
      <Head>
        <title>Lumina interface</title>
      </Head>
      <ChakraProvider theme={theme}>
        <IsSidebarOpenProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </IsSidebarOpenProvider>
      </ChakraProvider>
    </>
  );
}
