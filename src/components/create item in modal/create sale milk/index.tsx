'use client';

import { ModalSaleCattle } from '@/components/modals/sale cattle';
import { ModalSaleMilk } from '@/components/modals/sale milk';
import { Comprador, PreciosDeLeche, ResponseCompradores } from '@/types';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import { useDisclosure } from '@nextui-org/react';

type ListaPreciosRegistradosProps = {
    ListaPreciosRegistrados: PreciosDeLeche[];
};

export const CreateSaleMilk = ({
    ListaPreciosRegistrados,
}: ListaPreciosRegistradosProps) => {
    const { onOpen, onOpenChange } = useDisclosure();

    return (
        <ModalSaleMilk
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            selectPrecios={ListaPreciosRegistrados}
        />
    );
};
