'use client';

import { useDisclosure } from '@nextui-org/modal';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';

export const ModalCastrateBullCalf = ({
    dataHeader,
}: Pick<ModalProps, 'dataHeader'>) => {
    const { onOpen, onOpenChange } = useDisclosure();

    return (
        <LayoutModal
            icon="bullCalf"
            titleModal={'Desea capar el becerro '}
            dataHeader={`${dataHeader} ?`}
            footer={true}
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <p>Esta accion no se puede devolver</p>
        </LayoutModal>
    );
};
