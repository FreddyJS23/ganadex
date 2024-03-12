import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';

export const ModalNewPriceMilk = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    dataHeader,
}: ModalProps) => {
    return (
        <LayoutModal
            icon="price"
            titleModal={'Crear nuevo precio para la leche'}
            dataHeader={dataHeader}
            footer={true}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <form action="" method="post" className="m-auto w-2/4 ">
                <Input
                    id="precio"
                    label="Precio"
                    required
                    type="number"
                    endContent="dolar"
                    size="lg"
                />
            </form>
        </LayoutModal>
    );
};
