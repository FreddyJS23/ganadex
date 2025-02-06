'use client';

import { LayoutModal } from '..';
import { LayoutModalProps } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteUserVeterinary } from '@/actions/userVeterinary';

type ModalDeleteUserVeterinaryProps = Pick<
    LayoutModalProps,
    'dataHeader' | 'isOpen' | 'onOpenChange' | 'onClose'
> & {
    id: number;
};

export const ModalDeleteUserVeterinary = ({
    dataHeader,
    id,
    isOpen,
    onOpenChange,
    onClose
}: ModalDeleteUserVeterinaryProps) => {
    const router = useRouter();

    const actionDeleteUserVeterinary = async () => {
        try {
            await deleteUserVeterinary(id);
            toast.success('Usuario eliminado');
            router.refresh();
           onClose && onClose();
        } catch (error) {
            const message = error as string;
            return toast.error(message);
        }
    };

    return (
        <LayoutModal
            icon="customer"
            titleModal={'Eliminar usuario veterinario: '}
            dataHeader={`${dataHeader} ?`}
            footer={true}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClick={actionDeleteUserVeterinary}
            onClose={onClose}
        >
            <p>Confirmar la eliminacion de usuario</p>
        </LayoutModal>
    );
};
