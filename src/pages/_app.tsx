import Layout from "@/components/Layout";
import { wagmiConfig } from "@/config/wagmi";
import {
  AuthorizationProvider,
  GlobalUserProvider,
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
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AuthenticationData } from "@/types";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
  baseUserData,
  userAllData,
}: AppProps & {
  baseUserData: AuthenticationData;
  userAllData: any;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });
    NProgress.done();
    return () => {
      router.events.off("routeChangeStart", () => {
        NProgress.start();
      });
    };
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
                  <AuthorizationProvider data={baseUserData}>
                    <SelectedProjectProvider>
                      <GlobalUserProvider userData={userAllData}>
                        <Layout>
                          <Component {...pageProps} />
                        </Layout>
                      </GlobalUserProvider>
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
      return { baseUserData: undefined };
    }
    try {
      const response = await axiosClient.get(apiKeys["auth"]["isAuthorized"], {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userAllDataResponse = await axiosClient.post(apiKeys.fetch, {
        0: {
          model: "User",
          model_id: "None",
          limit: 1,
          orders: [],
          graph: {
            fetch_fields: [
              {
                name: "*",
              },
            ],
          },
          condition: {
            field: "email",
            operator: "EQ",
            value: response.data.email,
            __type__: "SimpleFetchCondition",
          },
        },
        1: {
          model: "Wallet",
          model_id: "None",
          limit: 1,
          orders: [],
          graph: {
            fetch_fields: [
              {
                name: "*",
              },
            ],
          },
          condition: {
            field: "user_id",
            operator: "EQ",
            value: response.data.id,
            __type__: "SimpleFetchCondition",
          },
        },
        2: {
          model: "User.followers",
          model_id: response.data.id,
          orders: [],
          graph: {
            fetch_fields: [
              {
                name: "*",
              },
            ],
          },
        },
        3: {
          model: "User.following",
          model_id: response.data.id,
          orders: [],
          graph: {
            fetch_fields: [
              {
                name: "*",
              },
            ],
          },
        },
      });
      if (response.status === 200) {
        return {
          baseUserData: response.data,
          userAllData: {
            user: userAllDataResponse.data[0][0],
            wallet: userAllDataResponse.data[1],
            followers: userAllDataResponse.data[2],
            followings: userAllDataResponse.data[3],
          },
        };
      }
    } catch (error) {
      return { baseUserData: undefined };
    }
  }
  return { baseUserData: undefined };
};
