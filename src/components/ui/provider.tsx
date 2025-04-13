'use client'

import {
    ChakraProvider,
    createSystem,
    defaultConfig
} from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

const system = createSystem(defaultConfig, {
    globalCss: {
        body: {
            colorPalette: 'blue',
        },
    },
    theme: {
        tokens: {
            fonts: {
                body: { value: 'var(--font-outfit)' },
            },
        },
        semanticTokens: {
            radii: {
                l1: { value: '0.125rem' },
                l2: { value: '0.25rem' },
                l3: { value: '0.375rem' },
            },
        },
    },
})

export const Provider = (props: PropsWithChildren) => (
    <ChakraProvider value={system}>
        {props.children}
    </ChakraProvider>
)
