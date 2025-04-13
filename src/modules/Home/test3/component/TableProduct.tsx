import { CategoryType } from '@/backend/Types/CategoryType'
import { ProductType } from '@/backend/Types/ProductType'
import { SelectCustom } from '@/components/Select'
import { Table } from '@chakra-ui/react'

export const TableProduct = ({
    data,
    categories,
    onSave,
}: {
    data: Array<ProductType>
    categories: Array<CategoryType>
    onSave: (productId: string, categoryId: string) => void,
}) => {

    return (
        <Table.Root striped>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader >
                        Nombre
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>
                        Categoria
                    </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((product, index) => (
                    <Table.Row key={index}>
                        <Table.Cell >
                            {product.name}
                        </Table.Cell>
                        <Table.Cell>
                            <SelectCustom
                                value={product.categoryId}
                                options={categories.map(e => ({
                                    value: e.id,
                                    label: e.name
                                }))}
                                onSave={(categoryId: string) => {
                                    onSave(product.id, categoryId)
                                }}
                            />
                        </Table.Cell>
                    </Table.Row>
                ))}
                {data.length == 0 && (<Table.Row>
                    <Table.Cell colSpan={3} textAlign={'center'}>
                        No hay datos que mostrar
                    </Table.Cell>
                </Table.Row>)}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.Cell >
                        Nombre
                    </Table.Cell>
                    <Table.Cell>
                        Categoria
                    </Table.Cell>
                </Table.Row>
            </Table.Footer>
        </Table.Root>
    )
}