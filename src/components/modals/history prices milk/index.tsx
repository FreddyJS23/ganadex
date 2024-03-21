import { LayoutModal } from '..';
import { ModalProps, PreciosDeLeche } from '@/types';
import { TableHistoryPriceMilk } from '@/components/tables/in modals/history price milk';

export const ModalHistoryMilk = ({
    isOpen,
    onOpen,
    onOpenChange,
    precios,
}: ModalProps & { precios: PreciosDeLeche[] }) => {
    return (
        <LayoutModal
            icon="price"
            titleModal={'Historial de precio de la leche'}
            footer={false}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <div className="m-auto mb-4">
                <TableHistoryPriceMilk precios={precios} />
            </div>
        </LayoutModal>
    );
};
