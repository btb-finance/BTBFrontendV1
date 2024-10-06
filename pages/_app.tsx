import { Provider } from "react-redux";
import Layout from "../components/layout";
import "../styles/globals.css";
import type { AppProps } from "next/app"; // Import the type for AppProps
import { store } from "../state-management/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
