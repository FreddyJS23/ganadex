'use client';

import { ModalCreateCustomer } from '@/components/modals/create customer';
import { useDisclosure } from '@nextui-org/react';

export const CreateCustomer = () => {
    const { onOpen, onOpenChange } = useDisclosure();

    return (
        <ModalCreateCustomer
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        />
    );
};
