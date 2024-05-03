import Layout from "@/components/Layout";
import { wagmiConfig } from "@/config/wagmi";
import {
  AuthorizationProvider,
  IsSidebarOpenProvider,
  SelectedProjectProvider,
  WalletConnectProvider,
} from "@/context";
import GoogleAnalytics from "@/GoogleAnalytics";
import "@/styles/globals.css";
import { theme } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { WagmiProvider } from "wagmi";
import { QueryParamProvider } from "use-query-params";
import NextAdapterApp from "next-query-params/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ? (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      ) : null}
      <Head>
        <title>Lumina interface</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryParamProvider adapter={NextAdapterApp}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
              <IsSidebarOpenProvider>
                <WalletConnectProvider>
                  <AuthorizationProvider>
                    <SelectedProjectProvider>
                      <Layout>
                        <Component {...pageProps} />
                      </Layout>
                    </SelectedProjectProvider>
                  </AuthorizationProvider>
                </WalletConnectProvider>
              </IsSidebarOpenProvider>
            </ChakraProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </QueryParamProvider>
    </>
  );
}
