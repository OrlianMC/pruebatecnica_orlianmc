import { Flex } from "@chakra-ui/react"

export const Loading = ({ isLoading, adapted }: { isLoading: boolean, adapted?: boolean }) => {
    return (
        <>
            {isLoading && (
                <Flex
                    w={'100%'}
                    h={'80vh'}
                    bg={adapted ? '#F5F9FC' : '#F5F9FC'}
                    backdropFilter="blur(10px)"
                    zIndex={999}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <div className="loader"></div>
                </Flex>
            )}
        </>
    )
}