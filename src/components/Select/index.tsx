import { createListCollection, Portal, Select } from "@chakra-ui/react"

interface Props {
    value: string
    options: Array<{ label: string, value: string }>
    onSave: (categoryId: string) => void
}

export const SelectCustom = ({
    value,
    options,
    onSave
}: Props) => {
    const frameworks = createListCollection({
        items: options,
    })
    return (
        <Select.Root collection={frameworks} onChange={(e: any) => onSave(e.target.value)} defaultValue={[value]}>
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Elija una categoria" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {frameworks.items.map((framework) => (
                            <Select.Item item={framework} key={framework.value}>
                                {framework.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}