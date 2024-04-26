'use client';

import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { useDisclosure } from '@nextui-org/react';
import { useRef } from 'react';

export const ModalAssignmentNumberBullCalf = ({
    dataHeader,
}: Pick<ModalProps, 'dataHeader'>) => {
    const { onOpen, onOpenChange } = useDisclosure();

const formRef=useRef(null)
    return (
        <LayoutModal
            icon="bullCalf"
            titleModal={'Asignación de numero al becerro '}
            dataHeader={`${dataHeader} ?`}
            footer={true}
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            refForm={formRef}
        >
            <form ref={formRef} id='form-assignmentNumber' action={actionAssigmentNumberBullCalf}  className="m-auto w-2/4 ">
                <Input
                    id="numero"
                    label="Numero"
                    required
                    type="number"
                    size="lg"
                    register={register}
                    errors={errors}
                />
            </form>
        </LayoutModal>
    );
};
