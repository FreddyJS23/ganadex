'use client';

import { LayoutModal } from '../..';
import { Revision } from '@/types';
import { TableHistoryCheckUps } from '@/components/tables/in modals/history checkups';
import { ContainerTableHistory } from '..';

export const ModalHistoryCheckUps = async ({
    revisiones,
}: {
    revisiones: Revision[];
}) => {
    return (
        <LayoutModal
            icon="checkUp"
            titleModal={'Historial de revisiones'}
            footer={false}
            isOpen={true}
        >
            <ContainerTableHistory>
                <TableHistoryCheckUps revisiones={revisiones} />
            </ContainerTableHistory>
        </LayoutModal>
    );
};
