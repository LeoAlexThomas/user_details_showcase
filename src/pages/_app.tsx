import api from "@/components/api";
import { FilterDataProvider } from "@/contexts/filterContext";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { ReactElement, ReactNode } from "react";
import { SWRConfig } from "swr";

export const swrConfigData = {
  fetcher: api,
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        {/* NOTE: Below code is to prevent zooming in iPhone when input is focused */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SWRConfig value={swrConfigData}>
        <ChakraProvider>
          <FilterDataProvider>
            {getLayout(<Component {...pageProps} key={router.asPath} />)}
          </FilterDataProvider>
        </ChakraProvider>
      </SWRConfig>
    </>
  );
}
