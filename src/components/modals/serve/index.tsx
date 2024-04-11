'use client';

import { useDisclosure } from '@nextui-org/react';
import { LayoutModal } from '..';
import { ModalProps, Servicio } from '@/types';

export const ModalServe = ({
    servicio,
}: ModalProps & { servicio: Servicio }) => {
    const { onOpen, onOpenChange } = useDisclosure();

    return (
        <LayoutModal
            icon="serve"
            titleModal={'Servicio del '}
            footer={false}
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            dataHeader={typeof servicio.fecha == 'string' ? servicio.fecha : ''}
        >
            <div className="flex flex-col gap-4 mb-4">
                <p>
                    <b>Observación: </b> {servicio.observacion}
                </p>
                <p>
                    <b>Toro: </b> {servicio.toro.numero}
                </p>
                <p>
                    <b>Tipo: </b> {servicio.tipo}
                </p>
                 <p>
                    <b>Veterinario que hizo el servicio: </b> {servicio.veterinario.nombre}
                </p>
            </div>
        </LayoutModal>
    );
};
