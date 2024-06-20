'use client';

import { ModalDeathCattle } from '@/components/modals/death cattle';
import { useDisclosure } from '@nextui-org/react';

export const CreateDeathCattle = () => {
    const { onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <ModalDeathCattle
                isOpen={true}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
};
