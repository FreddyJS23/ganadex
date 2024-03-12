import { LayoutModal } from '..';
import { ModalProps } from '@/types';

export const ModalCastrateBullCalf = ({isOpen,onClose,onOpen,onOpenChange,dataHeader}:ModalProps) => {
   

    return (
            <LayoutModal
            icon='bullCalf'
            titleModal={'Desea capar el becerro '}
            dataHeader={`${dataHeader} ?`}
            footer={true}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            >
                <p>Esta accion no se puede devolver</p>
            </LayoutModal>
        
    );
};
