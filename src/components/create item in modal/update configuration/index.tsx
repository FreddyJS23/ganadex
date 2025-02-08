'use client';

import { ModalUpdateConfiguracion } from '@/components/modals/update configuration';
import { useDisclosure } from '@nextui-org/react';

export const UpdateConfiguration = () => {
    const { onOpen, onOpenChange } = useDisclosure();

    return (
        <ModalUpdateConfiguracion
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        />
    );
};
