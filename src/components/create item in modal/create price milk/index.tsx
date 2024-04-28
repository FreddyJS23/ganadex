'use client';

import { ModalNewPriceMilk } from '@/components/modals/new price milk';
import { useDisclosure } from '@nextui-org/react';


export const CreatePriceMilk = () => {
    const { onOpen, onOpenChange } = useDisclosure();

    return (
        <ModalNewPriceMilk
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        />
    );
};
