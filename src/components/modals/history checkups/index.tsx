'use client'

import { LayoutModal } from '..';
import {  Revision,  } from '@/types';
import { TableHistoryCheckUps } from '@/components/tables/in modals/history checkups';


export const ModalHistoryCheckUps =async ({
    revisiones,
}: { revisiones: Revision[] }) => {
  
    return (
        <LayoutModal
            icon="checkUp"
            titleModal={'Historial de revisiones'}
            footer={false}
            isOpen={true}
        >
            <div className="m-auto mb-4">
                <TableHistoryCheckUps revisioness={revisiones} />
            </div>
        </LayoutModal>
    );
};
