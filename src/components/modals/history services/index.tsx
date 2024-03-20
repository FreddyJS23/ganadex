'use client'

import { LayoutModal } from '..';
import { ModalProps, Servicio } from '@/types';
import { TableHistoryServices } from '@/components/tables/in modals/history services';

export const ModalHistoryServices = ({
    servicios,
}: {servicios: Servicio[] }) => {
    return (
        <LayoutModal
            icon="serve"
            titleModal={'Historial de servicios'}
            footer={false}
            isOpen={true}
        >
            <div className="m-auto mb-4">
                <TableHistoryServices servicios={servicios} />
            </div>
        </LayoutModal>
    );
};
