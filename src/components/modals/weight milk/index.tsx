'use client';

import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { useDisclosure } from '@nextui-org/react';

export const ModalWeightMilk = ({
    dataHeader,
}: Pick<ModalProps, 'dataHeader'>) => {
    const { onOpen, onOpenChange } = useDisclosure();

    return (
        <LayoutModal
            icon="weight"
            titleModal={'Pesaje de leche este mes vaca '}
            dataHeader={dataHeader}
            footer={true}
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <form action="" method="post" className="m-auto w-2/4 ">
                <Input
                    id="pesajeLeche"
                    label="Pesaje"
                    required
                    type="number"
                    endContent="weight-milk"
                    size="lg"
                />
            </form>
        </LayoutModal>
    );
};
