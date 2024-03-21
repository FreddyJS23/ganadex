import { Input } from '@/components/Inputs';
import { LayoutModal } from '..';
import { ModalProps } from '@/types';

export const ModalDeathCattle = ({
    isOpen,
    
    onOpen,
    onOpenChange,
    dataHeader,
}: ModalProps) => {
    return (
        <LayoutModal
            icon="dead"
            titleModal={'Nuevo fallecimiento'}
            footer={true}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            dataHeader={dataHeader}
        >
            <form
                action=""
                method="post"
                className="m-auto flex flex-col gap-4 w-2/4 "
            >
                <Input
                    id="causa"
                    label="Causa"
                    required
                    type="text"
                    size="lg"
                />
            </form>
        </LayoutModal>
    );
};
