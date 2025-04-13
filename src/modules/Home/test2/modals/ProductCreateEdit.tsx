import {
    Button, CloseButton, Dialog, Field, Input,
    Portal, Stack, UseDialogReturn, Text
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { z } from 'zod';
import { ProductType } from "@/backend/Types/ProductType";

const profileSchema = z.object({
    id: z.string().min(1).optional(),
    name: z.string()
        .min(1, "El nombre es obligatorio"),
    price: z.string()
        .min(1, "El precio es obligatorio")
        .regex(/^\d+$/, "Solo números permitidos")
        .refine(val => parseInt(val) > 0, "El precio debe ser mayor a 0"),
    quantity: z.string()
        .min(1, "La cantidad es obligatoria")
        .regex(/^\d+$/, "Solo números permitidos")
        .refine(val => parseInt(val) > 0, "La cantidad debe ser mayor a 0"),
});

export const ProductCreateEdit = ({
    initialize,
    dialog,
}: {
    initialize: undefined | ProductType;
    dialog: UseDialogReturn;
}) => {
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [data, setData] = useState(
        initialize
            ? {
                ...initialize,
                price: String(initialize.price),
                quantity: String(initialize.quantity),
            }
            : { name: "", price: "", quantity: "" }
    );

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        const parsed = profileSchema.safeParse(data);
        if (!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors;
            const formatted: Record<string, string> = {};
            for (const key in errors) {
                if (errors[key]) formatted[key] = errors[key]![0];
            }
            setFormErrors(formatted);
            setLoading(false);
            return;
        }

        try {
            let response: Response;

            if (!initialize) {
                response = await fetch('/api/products/product', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch('/api/products/product', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar');
            }

            toaster.create({
                title: initialize ? "Producto actualizado" : "Producto creado",
                duration: 9000,
                type: 'success',
            });

            dialog.setOpen(false);

        } catch (error) {
            console.error('Error al guardar:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

            toaster.create({
                title: errorMessage,
                duration: 9000,
                type: 'error',
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Toaster />
            <Dialog.RootProvider value={dialog} placement="center">
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <form action="post" onSubmit={onSubmit}>
                                <Dialog.Header>
                                    <Dialog.Title>{initialize ? "Actualizar" : "Crear"} Producto</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Stack gap="5">
                                        <Field.Root>
                                            <Input type="text" name="id" disabled={loading} hidden />
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label>Nombre</Field.Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                disabled={loading}
                                                onChange={e => setData({ ...data, name: e.target.value })}
                                            />
                                            {formErrors.name && (
                                                <Text color="red.500" fontSize="sm">{formErrors.name}</Text>
                                            )}
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label>Precio</Field.Label>
                                            <Input
                                                type="text"
                                                name="price"
                                                value={data.price}
                                                disabled={loading}
                                                onChange={e => setData({ ...data, price: e.target.value })}
                                            />
                                            {formErrors.price && (
                                                <Text color="red.500" fontSize="sm">{formErrors.price}</Text>
                                            )}
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label>Cantidad</Field.Label>
                                            <Input
                                                type="text"
                                                name="quantity"
                                                value={data.quantity}
                                                disabled={loading}
                                                onChange={e => setData({ ...data, quantity: e.target.value })}
                                            />
                                            {formErrors.quantity && (
                                                <Text color="red.500" fontSize="sm">{formErrors.quantity}</Text>
                                            )}
                                        </Field.Root>
                                    </Stack>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                        <Button variant="outline" colorScheme="red">Cancelar</Button>
                                    </Dialog.ActionTrigger>
                                    <Button type="submit" loading={loading}>Guardar</Button>
                                </Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                            </form>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.RootProvider>
        </Fragment>
    );
};
