import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const persistor = persistStore(store);

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
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <NavBar />
                <Component {...pageProps} />
                <Footer />
              </PersistGate>
            </Provider>
          )}
        </MantineProvider>
      </AuthContextProvider>
    </>
  );
}
