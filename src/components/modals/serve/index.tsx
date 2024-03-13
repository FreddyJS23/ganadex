import { LayoutModal } from '..';
import { ModalProps, Servicio } from '@/types';

export const ModalServe = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    servicio,
}: ModalProps & { servicio: Servicio }) => {
    return (
        <LayoutModal
            icon="serve"
            titleModal={'Servicio del '}
            footer={false}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            dataHeader={servicio.fecha.toISOString()}
        >
            <div className="flex flex-col gap-4 mb-4">
                <p>
                    <b>Observación: </b> {servicio.observacion}
                </p>
                <p>
                    <b>Toro: </b> {servicio.numero_toro}
                </p>
                <p>
                    <b>Tipo: </b> {servicio.tipo}
                </p>
            </div>
        </LayoutModal>
    );
};
