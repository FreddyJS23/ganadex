'use client';

import { ModalSaleCattle } from '@/components/modals/sale cattle';
import { Comprador } from '@/types';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import { useDisclosure } from '@nextui-org/react';

export const CreateSaleCattle = ({
    ListaCompradoresRegistrados,
}: {
    ListaCompradoresRegistrados: Comprador[];
}) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <>
            <ButtonCreateItem onClick={onOpen} />
            <ModalSaleCattle
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                selectCompradores={ListaCompradoresRegistrados}
            />
        </>
    );
};
