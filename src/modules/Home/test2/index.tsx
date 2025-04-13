import { Divider } from '@/components/Divider'
import { Card, Stack, Text, useDialog } from '@chakra-ui/react'
import { Fragment, useEffect, useState } from 'react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { ProductCreateEdit } from './modals/ProductCreateEdit'
import { BarAdd } from './component/BarAdd'
import { TableProduct } from './component/TableProduct'
import { PaginationCustom } from '@/components/PaginationCustom'
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { ProductType } from '@/backend/Types/ProductType'

export const Testing2 = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([] as Array<ProductType>)
    const [initialize, setInitialize] = useState(undefined as undefined | ProductType)
    const dialog = useDialog()
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const filteredData = data.filter((item) => !item.isRemove);
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // useEffect(() => {
    //     onLoad();
    // }, []);

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

    const onDelete = async (id: string) => {
        withReactContent(Swal).fire({
            title: "¿Estás seguro?",
            text: "¿Estas seguro que deseas eliminar esta entrada?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si, elimínalo!",
            preConfirm: async () => {
                Swal.showLoading()
                try {
                    const response = await fetch(`/api/products/${id}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Error al eliminar');
                    }

                    if (response.status !== 204) {
                        await response.json();
                    }

                    if (response.status == 200) {
                        withReactContent(Swal).fire({
                            text: "Eliminado correctamente!",
                            icon: "success",
                        })
                        onLoad()
                    }

                } catch (error) {
                    console.error('Error al eliminar:', error);

                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Error desconocido en la conexión';

                    toaster.create({
                        title: errorMessage,
                        duration: 9000,
                        type: 'error',
                    });
                }
                finally {
                    Swal.hideLoading()
                }
            },
        })
    }

    useEffect(() => {
        if (!dialog.open) {
            onLoad()
        }
    }, [dialog.open])

    return (
        <Fragment>
            <Toaster />

            <Card.Root id={'test2'}>
                <Card.Header >
                    <Divider>
                        <Text fontWeight="medium">Habilidad Número 2</Text>
                    </Divider>
                </Card.Header>
                <Card.Body gap={4}>
                    <Text>
                        Habiendo dominado como guardar datos con Sequelize, ahora subimos la parada, mostramos a continuación un CRUD (Create, Read, Update, Delete) de productos.
                        Debe crear el servicio endpoint para hacer posible que se pueda leer, crear, actualizar y eliminar estos registros. IMPORTANTE: Los datos no se eliminan,
                        cada modelo tiene un campo llamado isRemove que indica si está eliminado o no. Por tanto cuando haga un get para obtener los datos, debe mostrar todos
                        los que isRemove sean falsos.
                    </Text>

                    <Text>
                        Puntos extras si se realiza el paginado y se trabaja en validaciones.
                    </Text>

                    <Stack>
                        <BarAdd
                            loading={loading}
                            dialog={dialog}
                            setInitialize={setInitialize}
                        />
                        {dialog.open && <ProductCreateEdit
                            initialize={initialize}
                            dialog={dialog}
                        />}
                    </Stack>

                    <TableProduct
                        data={paginatedData}
                        dialog={dialog}
                        setInitialize={setInitialize}
                        onDelete={onDelete}
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