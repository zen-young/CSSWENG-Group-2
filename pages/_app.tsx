import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Upscale Printing Solutions</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AuthContextProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          {router.pathname.includes("/admin") ? (
            <Component {...pageProps} />
          ) : (
            <>
              <NavBar />
              <Component {...pageProps} />
              <Footer />
            </>
          )}
        </MantineProvider>
      </AuthContextProvider>
    </>
  );
}
