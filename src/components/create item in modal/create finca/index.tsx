'use client';

import { ModalCreateFinca } from '@/components/modals/create finca';
import { useDisclosure } from '@nextui-org/react';

export const CreateFinca = () => {
    const { onOpen, onOpenChange } = useDisclosure();

    return (
        <ModalCreateFinca
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        />
    );
};
