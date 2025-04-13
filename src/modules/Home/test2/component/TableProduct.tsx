import { ProductType } from '@/backend/Types/ProductType';
import { Button, HStack, Table, UseDialogReturn } from '@chakra-ui/react'

export const TableProduct = ({
    data,
    dialog,
    setInitialize,
    onDelete
}: {
    data: Array<ProductType>
    dialog: UseDialogReturn,
    setInitialize: (initialize: undefined | ProductType) => void,
    onDelete: (id: string) => void
}) => {
    
    return (
        <Table.Root striped>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader >
                        Nombre
                    </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">
                        Precio
                    </Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">
                        Cantidad
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>

                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((product, index) => (
                    <Table.Row key={index}>
                        <Table.Cell >
                            {product.name}
                        </Table.Cell>
                        <Table.Cell textAlign="end">
                            {product.price}
                        </Table.Cell>
                        <Table.Cell textAlign="end">
                            {product.quantity}
                        </Table.Cell>
                        <Table.Cell>
                            <HStack gap="4" justifyContent={'center'}>
                                <Button variant="ghost" onClick={() => {
                                    setInitialize(product)
                                    dialog.setOpen(true)
                                }}>Editar</Button>
                                <Button variant="ghost" colorPalette={'red'} onClick={() => {
                                    setInitialize(product)
                                    onDelete(product.id)
                                }}>Eliminar</Button>
                            </HStack>
                        </Table.Cell>
                    </Table.Row>
                ))}
                {data.length == 0 && (<Table.Row>
                    <Table.Cell colSpan={4} textAlign={'center'}>
                        No hay datos que mostrar
                    </Table.Cell>
                </Table.Row>)}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.Cell >
                        Nombre
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                        Precio
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                        Cantidad
                    </Table.Cell>
                    <Table.Cell>

                    </Table.Cell>
                </Table.Row>
            </Table.Footer>
        </Table.Root>
    )
}