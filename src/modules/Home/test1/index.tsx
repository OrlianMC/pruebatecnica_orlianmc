import { Divider } from '@/components/Divider';
import { Button, Card, Field, Input, Stack, Text } from '@chakra-ui/react';
import { Fragment, useState, useEffect } from 'react';
import { Toaster, toaster } from "@/components/ui/toaster";
import { useSession } from 'next-auth/react';
import { z } from 'zod';

const validateCIDate = (ci: string) => {
    if (!/^\d{11}$/.test(ci)) return { valid: false, message: "Formato inválido" };

    const yy = parseInt(ci.slice(0, 2));
    const mm = parseInt(ci.slice(2, 4));
    const dd = parseInt(ci.slice(4, 6));

    const year = yy > 50 ? 1900 + yy : 2000 + yy;

    if (mm < 1 || mm > 12) {
        return {
            valid: false,
            message: `Mes inválido (${mm.toString().padStart(2, '0')})`
        };
    }

    const daysInMonth = new Date(year, mm, 0).getDate(); // Días reales del mes

    if (dd < 1 || dd > daysInMonth) {
        return {
            valid: false,
            message: `Día inválido (${dd}) para ${mm.toString().padStart(2, '0')}/${year}`
        };
    }

    return { valid: true };
};

const profileSchema = z.object({
    id: z.string().min(1),
    first_name: z.string().min(1, "El nombre es obligatorio"),
    last_name: z.string().min(1, "El apellido es obligatorio"),
    ci: z.string()
        .length(11, "Debe tener 11 dígitos")
        .regex(/^\d+$/, "Solo números permitidos")
        .refine(
            (ci) => {
                const result = validateCIDate(ci);
                return result.valid;
            },
            (ci) => ({ message: validateCIDate(ci).message })
        ),
    email: z.string().email("Correo inválido"),
    phone: z.string()
        .min(6, "El teléfono no es válido")
        .regex(/^\d+$/, "El teléfono solo debe contener números")
        .refine(validateCIDate, {
            message: "Fecha de nacimiento inválida en el carnet (formato AAMMDD)"
        }),
});

export const Testing1 = () => {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        ci: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (session?.user) {
            setFormData({
                id: session.user.id || '',
                first_name: session.user.first_name || '',
                last_name: session.user.last_name || '',
                ci: session.user.ci || '',
                email: session.user.email || '',
                phone: session.user.phone || ''
            });
        }

    }, [session]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        const parsed = profileSchema.safeParse(formData);
        if (!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors;
            const formatted: Record<string, string> = {};
            for (const key in errors) {
                if (errors[key]) formatted[key] = errors[key]![0];
            }
            setFormErrors(formatted);

            toaster.create({
                title: "Revisa los campos con errores",
                type: "error",
            });

            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const contentType = response.headers.get('content-type');
            const resJson = contentType?.includes('application/json')
                ? await response.json()
                : null;

            if (!response.ok) {
                throw new Error(resJson?.details || 'Error desconocido del servidor');
            }

            toaster.create({
                title: "Perfil actualizado",
                duration: 9000,
                type: 'success',
            });

        } catch (error) {
            console.error('Error en la actualización:', error);

            const errorMessage = error instanceof Error
                ? error.message
                : 'Error desconocido en la conexión';

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

            <Card.Root id={'test1'}>
                <Card.Header>
                    <Divider>
                        <Text fontWeight="medium">Habilidad Número 1</Text>
                    </Divider>
                </Card.Header>

                <Card.Body gap={4}>
                    <Text>
                        Para poder operar con el sistema de Merco Sistema, es importante saber usar Sequelize. Sequelize es un ORM de base de datos compatible con Sqlite, Postgress
                        y otros. En esta prueba trabajaremos con Sqlite por la simplicidad de configuración, en el proyecto real se usa Postgrees que solo diferencia algunas cuestiones
                        de configuración.
                    </Text>

                    <Text>
                        En esta primera habilidad, deberá completar el siguiente Script para poder modificar los datos de este perfil. Les damos una pista, se debe hacer una
                        petición a /api/profile. revisa el código y completa el script. En la carpeta /backend/models encontrarán los modelos de BD que se usarán en estos test.
                        Para probar si realmente guardo, refresque la pantalla para cargar los datos.
                    </Text>

                    <form onSubmit={onSubmit}>
                        <Stack gap="5">
                            <Field.Root>
                                <Input type="text" name="id" value={formData.id} disabled={loading} hidden />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Nombre</Field.Label>
                                <Input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {formErrors.first_name && (
                                    <Text color="red.500" fontSize="sm">
                                        {formErrors.first_name}
                                    </Text>
                                )}
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Apellidos</Field.Label>
                                <Input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {formErrors.last_name && (
                                    <Text color="red.500" fontSize="sm">
                                        {formErrors.last_name}
                                    </Text>
                                )}
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Carnet</Field.Label>
                                <Input
                                    type="text"
                                    name="ci"
                                    value={formData.ci}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {formErrors.ci && (
                                    <Text color="red.500" fontSize="sm">
                                        {formErrors.ci}
                                    </Text>
                                )}
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Correo</Field.Label>
                                <Input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {formErrors.email && (
                                    <Text color="red.500" fontSize="sm">
                                        {formErrors.email}
                                    </Text>
                                )}
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Teléfono</Field.Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {formErrors.phone && (
                                    <Text color="red.500" fontSize="sm">
                                        {formErrors.phone}
                                    </Text>
                                )}
                            </Field.Root>
                        </Stack>

                        <Stack gap="4" mt={4}>
                            <Button type="submit" loading={loading}>Guardar</Button>
                        </Stack>
                    </form>
                </Card.Body>

                <Card.Footer />
            </Card.Root>
        </Fragment>
    );
};