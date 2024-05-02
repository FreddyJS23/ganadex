'use client';

import { LayoutModal } from '../..';
import { Comprador, ModalProps, } from '@/types';
import { ContainerTableHistory } from '..';
import { TableCustomers } from '@/components/tables/in modals/customers';

export const ModalCustomers= ({
    compradores,
}: ModalProps & { compradores: Comprador[] }) => {
    return (
        <LayoutModal
            icon="customer"
            titleModal={'Compradores registrados'}
            footer={false}
            isOpen={true}
        >
            <ContainerTableHistory>
                <TableCustomers compradores={compradores} />
            </ContainerTableHistory>
        </LayoutModal>
    );
};
