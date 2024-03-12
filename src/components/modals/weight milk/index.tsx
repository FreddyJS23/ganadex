import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';

export const ModalWeightMilk = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    dataHeader,
}: ModalProps) => {
    return (
        <LayoutModal
            icon="weight"
            titleModal={'Pesaje de leche este mes vaca '}
            dataHeader={dataHeader}
            footer={true}
            isOpen={isOpen}
            onClose={onClose}
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
