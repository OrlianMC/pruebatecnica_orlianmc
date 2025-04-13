import { Button, Flex, Stack, Progress, UseDialogReturn } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'

export const BarAdd = ({
    loading,
    dialog,
    setInitialize
}: {
    loading: boolean,
    dialog: UseDialogReturn,
    setInitialize: (initialize: undefined | any) => void
}) => {

    return (
        <Flex w={'100%'} alignItems={'center'} gap={4}>
            <Stack flex={1} w="240px">
                {loading && <Progress.Root maxW="240px" value={null}>
                    <Progress.Track>
                        <Progress.Range />
                    </Progress.Track>
                </Progress.Root>}
            </Stack>
            <Stack flex={1}>
                <Button onClick={() => {
                    setInitialize(undefined)
                    dialog.setOpen(true)
                }}>
                    <FiPlus /> Agregar Producto
                </Button>
            </Stack>
        </Flex>
    )
}