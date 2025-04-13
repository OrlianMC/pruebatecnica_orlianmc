import { Box } from "@chakra-ui/react";
import React, { ReactNode, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Loading } from "../LoadSuspense/Loading";
import Footer from "../Footer";
import { Navbar } from "../Navbar";

type Props = {
  children: ReactNode | ReactNode[];
  screenTitle?: string;
};

export default function MainLayout({ children, screenTitle }: Props) {
  const session = useSession();
  const { status, data } = session;
  const router = useRouter();
  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/");
    }
  }, [session, status, data]);

  return (
    <main>
      <Box
        minHeight={"100vh"}
        padding={"30px"}
        paddingTop={"0px"}
        backgroundColor={"#F5F9FC"}
        overflow={'hidden'}
      >
        <Head>
          <title>{screenTitle ? screenTitle : "Prueba Técnica"}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Box display={{ base: 'none', md: 'initial' }}>
          <Navbar />
        </Box>
        <Box>
          {status == "loading" ? <Loading isLoading /> : <>{children}</>}
        </Box>
      </Box>
      <Footer />
    </main>

  );
}
