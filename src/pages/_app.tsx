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
import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthenticationData } from "@/types";
import { NextPage } from "next";

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function commonLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}
export default function App({
  Component,
  pageProps,
  baseUserData,
  userAllData,
}: AppPropsWithLayout & {
  baseUserData: AuthenticationData;
  userAllData: any;
}) {
  const getLayout = Component.getLayout || commonLayout;

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
                        {getLayout(<Component {...pageProps} />)}
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

//TODO should fix this type

App.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const cookies = ctx.req?.cookies;
  if (!!cookies) {
    const accessToken = cookies[ACCESS_TOKEN_COOKIE_KEY];
    if (!accessToken) {
      // @ts-expect-error fix type
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
      });
      if (response.status === 200) {
        return {
          baseUserData: response.data,
          userAllData: {
            user: userAllDataResponse.data[0][0],
            wallet: userAllDataResponse.data[1],
          },
        };
      }
    } catch (error: any) {
      console.log(error);

      return { baseUserData: undefined };
    }
  }
  return { baseUserData: undefined };
};
