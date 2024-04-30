'use client';

import { useDisclosure } from '@nextui-org/modal';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';
import { toast } from 'sonner';
import { castrateBullCalf } from '@/actions/castrateBullCalf';
import { useParams, useRouter } from 'next/navigation';

export const ModalCastrateBullCalf = ({
    dataHeader,
}: Pick<ModalProps, 'dataHeader'>) => {
    const { onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const params = useParams<{ id: string }>();

    const actionCastrateBullCalf= async () => {
    try {
        await castrateBullCalf(parseInt(params.id));
        toast.success('Operación exitosa');
         router.back();
        router.refresh(); 
    } catch (error) {
        const message = error as string;
        return toast.error(message);
    }
};

    return (
        <LayoutModal
            icon="bullCalf"
            titleModal={'Desea capar el becerro '}
            dataHeader={`${dataHeader} ?`}
            footer={true}
            isOpen={true}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            onClick={actionCastrateBullCalf}
        >
            <p>Esta accion no se puede devolver</p>
        </LayoutModal>
    );
};
