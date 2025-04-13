import { Link, Stack, type StackProps } from '@chakra-ui/react'

export const NavbarLinks = (props: StackProps) => {

    const scrollToDiv = (id: string) => {
        const targetElement = document.getElementById(id); // Obtén el elemento por su ID
        if (targetElement) { 
            targetElement.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento animado
        }
    };

    const menu = [
        {
            label: 'Prueba Habilidad #1',
            tag: 'test1'
        },
        {
            label: 'Prueba Habilidad #2',
            tag: 'test2'
        },
        {
            label: 'Prueba Habilidad #3',
            tag: 'test3'
        },
    ]

    return (
        <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
            {menu.map((item) => (
                <Link
                    key={item.tag}
                    fontWeight="medium"
                    color="fg.muted"
                    _hover={{
                        _hover: { color: 'colorPalette.fg', textDecoration: 'none' },
                    }}
                    href={`#${item.tag}`}
                    onClick={(e) => { e.preventDefault(); scrollToDiv(item.tag); }}
                >
                    {item.label}
                </Link>
            ))}
        </Stack>
    )
}
