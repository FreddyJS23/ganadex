'use client';

import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { useDisclosure } from '@nextui-org/react';

export const ModalAssignmentNumberBullCalf = ({
    dataHeader,
}: Pick<ModalProps, 'dataHeader'>) => {
    const { onOpen, onOpenChange } = useDisclosure();

    return (
        <LayoutModal
            icon="bullCalf"
            titleModal={'Asignación de numero al becerro '}
            dataHeader={`${dataHeader} ?`}
            footer={true}
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <form action="" method="post" className="m-auto w-2/4 ">
                <Input
                    id="AsignacionNumero"
                    label="Numero"
                    required
                    type="number"
                    size="lg"
                />
            </form>
        </LayoutModal>
    );
};
