import { Divider } from '@/components/Divider'
import { Button, Card, Flex, Progress, Stack, Text } from '@chakra-ui/react'
import { Fragment, useState } from 'react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { TableProduct } from './component/TableProduct'
import { PaginationCustom } from '@/components/PaginationCustom'
import { CategoryType } from '@/backend/Types/CategoryType'
import { FiRefreshCw } from 'react-icons/fi'
import { ProductType } from '@/backend/Types/ProductType'

export const Testing3 = ({
    categories
}: {
    categories: Array<CategoryType>
}) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([] as Array<ProductType>)
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const filteredData = data.filter((item) => !item.isRemove);
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Debe cargar los datos
    const onLoad = async () => {
        setLoading(true)

        try {
            const response = await fetch('/api/products/product', {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const products = await response.json();
            setData(products);

        } catch (error) {
            console.error("Error al cargar productos:", error);
            const errorMessage = error instanceof Error
                ? error.message
                : "Error desconocido";

            toaster.create({
                title: "Error al cargar productos",
                description: errorMessage,
                duration: 9000,
                type: 'error'
            });

            setData([]);
        } finally {
            setLoading(false);
        }
    }

    // Guardar la categoria cuando se elija
    const onSave = async (productId: string, categoryId: string) => {
        setLoading(true)

        const response = await fetch(`/api/products/relation/${productId}/${categoryId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status == 200) {
            toaster.create({
                title: "Categoria asignada!",
                duration: 9000,
                type: 'success'
            })
        }
        else {
            toaster.create({
                title: "Error al relacionar producto con categoria",
                duration: 9000,
                type: 'error'
            })
        }

        setLoading(false)
    }

    return (
        <Fragment>
            <Toaster />

            <Card.Root id={'test3'}>
                <Card.Header >
                    <Divider>
                        <Text fontWeight="medium">Habilidad Número 3</Text>
                    </Divider>
                </Card.Header>
                <Card.Body gap={4}>
                    <Text>
                        Una vez dominado como hacer CRUDS, ahora vamos a relacionar productos con Categorias. Un producto pertenece a una categoria. Y una categoria
                        tiene muchos productos. La diferencia acá es que vamos a cargar todas las categorias desde el getServerSideProps, para pasar ya este listado
                        a esta vista en los select.
                    </Text>

                    <Text>
                        Para que se pueda realizar esta actividad, es escencial haber cumplido la habilidad anterior. Refresque la pantalla y cargue productos para conocer
                        si se ha guardado correctamente en BD.
                    </Text>

                    <Stack>
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
                                    onLoad()
                                }}>
                                    <FiRefreshCw /> Cargar Productos
                                </Button>
                            </Stack>
                        </Flex>
                    </Stack>

                    <TableProduct
                        data={paginatedData}
                        categories={categories}
                        onSave={onSave}
                    />

                    <PaginationCustom
                        currentPage={currentPage}
                        totalItems={filteredData.length}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                    />

                </Card.Body>
                <Card.Footer />
            </Card.Root>

        </Fragment>
    )
}