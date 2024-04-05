import Layout from "@/components/Layout";
import { IsSidebarOpenProvider } from "@/context";
import "@/styles/globals.css";
import { theme } from "@/theme";
import { ChakraProvider,  } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <IsSidebarOpenProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IsSidebarOpenProvider>
    </ChakraProvider>
  );
}
