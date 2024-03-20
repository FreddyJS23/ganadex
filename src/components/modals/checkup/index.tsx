'use client'

import { useDisclosure } from '@nextui-org/modal';
import { LayoutModal } from '..';
import { ModalProps, Revision } from '@/types';

export const ModalCheckUp = ({
    revision,
}: ModalProps & { revision: Revision }) => {
    const { onOpen, onOpenChange } = useDisclosure();
    
    return (
        
        <LayoutModal
            icon="checkUp"
            titleModal={'Revision del '}
            footer={false}
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            dataHeader={typeof revision.fecha == 'string' ? revision.fecha : ''}
        >
            <div className="flex flex-col gap-4 mb-4">
                <p>
                    <b>Diagnostico: </b> {revision.diagnostico}
                </p>
                <p>
                    <b>Tratamiento: </b> {revision.tratamiento}
                </p>
            </div>
        </LayoutModal>
    );
};
