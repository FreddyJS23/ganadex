import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';

export const ModalAssignmentNumberBullCalf = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    dataHeader,
}: ModalProps) => {
    return (
        <LayoutModal
            icon="bullCalf"
            titleModal={'Asignación de numero al becerro '}
            dataHeader={`${dataHeader} ?`}
            footer={true}
            isOpen={isOpen}
            onClose={onClose}
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
