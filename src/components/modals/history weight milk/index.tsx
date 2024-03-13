import { LayoutModal } from '..';
import { ModalProps, PesajeLecheGanado } from '@/types';
import { TableHistoryWeightMilk } from '@/components/tables/in modals/history weight milk';

export const ModalHistoryWeightMilk = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    pesajes_leche,
}: ModalProps & { pesajes_leche: PesajeLecheGanado[] }) => {
    return (
        <LayoutModal
            icon="milk"
            titleModal={'Historial pesajes mensuales de leche'}
            footer={false}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <div className="m-auto mb-4">
                <TableHistoryWeightMilk pesajes_leche={pesajes_leche} />
            </div>
        </LayoutModal>
    );
};
