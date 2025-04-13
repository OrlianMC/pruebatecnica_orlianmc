import LoadSuspense from "@/components/LoadSuspense";
import { Center } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

export default function Auth() {
    return (
        <Center
            minHeight={"100vh"}
            width={"full"}
            backgroundColor={"#F3F7F9"}
            borderRadius={"lg"}
        >
            <Head>
                <title>Autenticación</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LoadSuspense load={() => import('@/modules/Auth')} />
        </Center>
    )
}
