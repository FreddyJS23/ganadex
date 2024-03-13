import { LayoutModal } from '..';
import { ModalProps, Parto } from '@/types';
import { TableHistoryBirths } from '@/components/tables/in modals/history births';

export const ModalHistoryBirths = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    partos,
}: ModalProps & { partos: Parto[] }) => {
    return (
        <LayoutModal
            icon="pregnancy"
            titleModal={'Historial de partos'}
            footer={false}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <div className="m-auto mb-4">
                <TableHistoryBirths partos={partos} />
            </div>
        </LayoutModal>
    );
};
