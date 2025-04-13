import {
    Center,
    CollapsibleContent,
    CollapsibleRoot,
    Container,
    HStack,
    Spacer,
    Button,
    CollapsibleTrigger,
} from '@chakra-ui/react'
import { NavbarLinks } from './components/navbar-links'
import { signOut } from 'next-auth/react';

export const Navbar = () => {
    const onSignOut = async () => {
        await signOut({ callbackUrl: "/", redirect: false });
    };

    return (
        <Center position="absolute" zIndex="docked" top="6" left="4" right="4">
            <Container
                background="bg.panel"
                borderRadius="l3"
                boxShadow="xs"
                maxW={{ base: 'full', md: 'fit-content' }}
                px="4"
                py="3"
            >
                <CollapsibleRoot>
                    <HStack gap={{ base: '3', md: '8' }}>
                        <Spacer hideFrom="md" />
                        <NavbarLinks hideBelow="md" />
                        <Button size={{ base: 'sm', md: 'md' }} onClick={onSignOut}>Salir</Button>
                        <CollapsibleTrigger />
                    </HStack>
                    <CollapsibleContent hideFrom="md">
                        <NavbarLinks pt="5" pb="2" alignItems="center" />
                    </CollapsibleContent>
                </CollapsibleRoot>
            </Container>
        </Center>
    )
}
