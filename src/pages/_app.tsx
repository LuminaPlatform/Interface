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
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
  isAuthenticated,
}: AppProps & {
  isAuthenticated: boolean;
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);
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
                  <AuthorizationProvider isAuthenticated={isAuthenticated}>
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
App.getInitialProps = async ({ ctx }) => {
  const cookies = ctx.req?.cookies;
  if (!!cookies) {
    const accessToken = cookies[ACCESS_TOKEN_COOKIE_KEY];
    if (!accessToken) {
      return { isAuthenticated: false };
    }
    const response = await axiosClient.get(apiKeys["auth"]["isAuthorized"], {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      return { isAuthenticated: true };
    }
    return { isAuthenticated: false };
  }
  return { isAuthenticated: false };
};
