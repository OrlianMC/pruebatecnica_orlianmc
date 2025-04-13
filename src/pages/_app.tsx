import "@/styles/globals.css";
import "../../public/fonts/fonts.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "@/components/ui/provider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider>
          <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}
