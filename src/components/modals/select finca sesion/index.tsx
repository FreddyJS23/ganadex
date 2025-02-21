'use client';

import { LayoutModal } from '..';
import { Finca } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Select,
    Selection,
    SelectItem,
    useDisclosure,
} from '@nextui-org/react';
import { createSesionFinca as createSesionFincaAction } from '@/actions/finca';
import { getSession, useSession } from 'next-auth/react';

export const ModalSelectFincaSesion = ({ fincas }: { fincas: Finca[] }) => {
    const { handleSubmit, control } = useForm<{ finca_id: number }>();
    const router = useRouter();
    const { update, data: session,status } = useSession();
    const formRef = useRef(null);
    const { onOpen, onOpenChange } = useDisclosure();
    const [value, setValue] = useState<Selection>(new Set([]));

     useEffect(() => {
        /* Llamar a la sesion para que el status el hook useSession se actualice y pase a authenticated,
        si no se hace esto el state queda en unauthenticated y no se actualiza, no permitiendo que se llame
        la funcion update para actualizar la sesion */
        const fetchSession = async () => await getSession();

        fetchSession();
      }, []);
 
    const createSesionFinca: () => void = handleSubmit(async (data) => {
        if (!data.finca_id) return toast.error('Debe seleccionar una finca');
        try {
            const res = await createSesionFincaAction(data.finca_id);
            //actualizar sesion ya que hay una finca en sesion
            await update({
                ...session,
                user: { ...session?.user, sesion_finca: true },
            });
            const finca = res as string;
            toast.success(`Empezando a Trabajar en ${finca}`);
            /*verificar la sesion en el servidor para redireccionar  */
            router.push('/api/verificar_sesion_finca');
        } catch (error) {
            toast.error(error as string);
        }
    });

    //descripcion de cuando se cierra la sesion y se redirige a signOut
    const onClose = () => {
        router.push('/api/signOut');
    };

    return (
        <LayoutModal
            icon="price"
            titleModal={'Selecionar finca en la que trabajar'}
            footer={true}
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            refForm={formRef}
            onClose={onClose}
            isDismissable={false}
        >
            <form
                id="form-select-finca"
                className="m-auto"
                ref={formRef}
                action={createSesionFinca}
            >
                <Controller
                    name={'finca_id'}
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            id="finca_id"
                            className="w-60"
                            variant="underlined"
                            label="Fincas"
                            required
                            color="primary"
                            selectedKeys={value}
                            description="Fincas registradas por el usuario"
                            onSelectionChange={(keys) => {
                                setValue(keys);
                            }}
                            classNames={{
                                label: 'text-current font-bold',
                                value: 'text-current',
                                popoverContent: 'bg-base-100',
                            }}
                        >
                            {fincas.map(({ id, nombre }) => (
                                <SelectItem key={id}>{nombre}</SelectItem>
                            ))}
                        </Select>
                    )}
                />
            </form>
        </LayoutModal>
    );
};
