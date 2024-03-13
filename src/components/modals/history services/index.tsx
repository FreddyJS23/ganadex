import { LayoutModal } from '..';
import { ModalProps, Revision, Revisiones, Servicio } from '@/types';
import { TableHistoryServices } from '@/components/tables/in modals/history services';

export const ModalHistoryServices = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    servicios,
}: ModalProps & { servicios: Servicio[] }) => {
    return (
        <LayoutModal
            icon="serve"
            titleModal={'Historial de servicios'}
            footer={false}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <div className="m-auto mb-4">
                <TableHistoryServices servicios={servicios} />
            </div>
        </LayoutModal>
    );
};
