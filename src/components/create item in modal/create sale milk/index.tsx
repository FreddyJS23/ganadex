'use client';

import { ModalSaleCattle } from '@/components/modals/sale cattle';
import { ModalSaleMilk } from '@/components/modals/sale milk';
import { Comprador, PreciosDeLeche, ResponseCompradores } from '@/types';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import { useDisclosure } from '@nextui-org/react';

export const CreateSaleMilk = ({
    ListaPreciosRegistrados,
}: {
    ListaPreciosRegistrados: PreciosDeLeche[];
}) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <>
            <ButtonCreateItem onClick={onOpen} />
            <ModalSaleMilk
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                selectPrecios={ListaPreciosRegistrados}
            />
        </>
    );
};
