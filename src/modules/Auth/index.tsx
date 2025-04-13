import {
    Button,
    Container,
    Field,
    Heading,
    Input,
    Link,
    Stack,
    Text
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FaGoogle } from 'react-icons/fa'
import { Toaster, toaster } from "@/components/ui/toaster"
import { useState } from 'react'

export default function AuthenticationForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value

        setLoading(true)
        await signIn('credentials', {
            username,
            password,
            redirect: false,
        }).then((e: any) => {
            if (e.ok) {
                router.push('/home')
                toaster.create({
                    title: "Autenticado con exitos!",
                    duration: 9000,
                    type: 'success'
                })
            }
            else {
                toaster.create({
                    title: e.error,
                    duration: 9000,
                    type: 'error'
                })
                setLoading(false)
            }
        })
    }

    return (
        <Container maxW="md" py={{ base: '12', md: '24' }}>
            <Toaster />
            <Stack gap="8">
                <Stack gap={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={{ base: '2xl', md: '3xl' }}>Bienvenid@</Heading>
                    <Text color="fg.muted">Prueba de habilidad en React/Next</Text>
                </Stack>

                <Stack gap="6">
                    <form action="post" onSubmit={onSubmit}>
                        <Stack gap="5">
                            <Field.Root>
                                <Field.Label>Usuario</Field.Label>
                                <Input type="text" name="username" />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Contraseña</Field.Label>
                                <Input type='password' name="password" />
                            </Field.Root>
                        </Stack>
                        <Stack gap="4" mt={4} >
                            <Button type='submit' loading={loading}>Autenticarse</Button>
                            <Button variant="outline" gap={2}>
                                <FaGoogle /> Autenticarse con Google
                            </Button>
                        </Stack>
                    </form>
                </Stack>

                <Text textStyle="sm" color="fg.muted" textAlign="center">
                    No tienes una cuenta?{' '}
                    <Link variant="underline" href="#">
                        Registrate
                    </Link>
                </Text>
            </Stack>
        </Container>
    )
}