import { Flex, Text } from "@chakra-ui/react";

export default function Footer({ bg }: { bg?: string }) {

    return (
        <footer>
            <Flex justifyContent={'center'} w={'100%'} p={5} bg={bg ? bg : "#F5F9FC"} fontSize={'12px'} flexDir={'column'}>
                <Text textAlign={'center'} color={'gray.400'}>
                    Prueba Técnica de Habilidades <br /> © 2025 Creado por <a target="_blank" href="https://noxcreation.dev/"> NOX Creation</a>
                </Text>
            </Flex>
        </footer>
    )
}
