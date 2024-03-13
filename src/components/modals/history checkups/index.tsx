import { LayoutModal } from '..';
import { ModalProps, Revision, Revisiones } from '@/types';
import { TableHistoryCheckUps } from '@/components/tables/in modals/history checkups';

export const ModalHistoryCheckUps = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    revisiones,
}: ModalProps & { revisiones: Revision[] }) => {
    return (
        <LayoutModal
            icon="checkUp"
            titleModal={'Historial de revisiones'}
            footer={false}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <div className="m-auto mb-4">
                <TableHistoryCheckUps revisioness={revisiones} />
            </div>
        </LayoutModal>
    );
};
