import { Alert, Container, Stack, Link } from '@chakra-ui/react'
import { Testing1 } from './test1'
import { Testing2 } from './test2'
import { Testing3 } from './test3'
import { CategoryType } from '@/backend/Types/CategoryType'

export default function Home({
    categories
}: {
    categories: Array<CategoryType>
}) {
    return (
        <Container maxW="7xl" py={{ md: '24' }}>

            <Stack gap={4}>
                <Alert.Root>
                    <Alert.Indicator />
                    <Alert.Content>
                        <Alert.Title >
                            Chakra Documentacion
                        </Alert.Title>
                        <Alert.Description >
                            <Link href='https://chakra-ui.com/docs/get-started/installation' target='_blank'>https://chakra-ui.com/docs/get-started/installation</Link>
                        </Alert.Description>
                    </Alert.Content>
                </Alert.Root>

                <Testing1 />

                <Testing2 />

                <Testing3
                    categories={categories}
                />
            </Stack>

        </Container>
    )
}