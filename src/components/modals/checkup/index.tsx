import { LayoutModal } from '..';
import { ModalProps, Revision, Revisiones } from '@/types';

export const ModalCheckUp = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    revision,
}: ModalProps & { revision: Revision }) => {
    return (
        <LayoutModal
            icon="checkUp"
            titleModal={'Revision del '}
            footer={false}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            dataHeader={revision.fecha.toISOString()}
        >
            <div className="flex flex-col gap-4 mb-4">
                <p>
                    <b>Diagnostico: </b> {revision.diagnostico}
                </p>
                <p>
                    <b>Tratamiento: </b> {revision.tratamiento}
                </p>
            </div>
        </LayoutModal>
    );
};
