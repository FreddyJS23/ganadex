'use client';

import { ModalCreateFinca } from '@/components/modals/create finca';
import { useDisclosure } from '@nextui-org/react';

export const CreateFinca = ({ primeraFinca=false }: { primeraFinca?: boolean }) => {
    const { onOpen, onOpenChange } = useDisclosure();

    return (
        <ModalCreateFinca
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            primeraFinca={primeraFinca}
        />
    );
};
