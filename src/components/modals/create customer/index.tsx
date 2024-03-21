import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';

export const ModalCreateCustomer = ({
    isOpen,
    
    onOpen,
    onOpenChange,
    
}: ModalProps) => {
    return (
        <LayoutModal
            icon="customer"
            titleModal={'Crear nuevo comprador'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <form action="" method="post" className="m-auto w-2/4 ">
                <Input
                    id="customer"
                    label="Comprador"
                    required
                    type="text"
                    size="lg"
                />
            </form>
        </LayoutModal>
    );
};
