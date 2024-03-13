import { LayoutModal } from '..';
import { ModalProps, Parto, Servicio } from '@/types';

export const ModalBirth = ({
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
    parto,
}: ModalProps & { parto: Parto }) => {
    const { cria, fecha, id, observacion, padre_numero } = parto;

    const { nombre, numero, sexo, peso_nacimiento } = cria;
    return (
        <LayoutModal
            icon="pregnancy"
            titleModal={'Parto del '}
            footer={false}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            dataHeader={fecha.toISOString()}
        >
            <div className="flex flex-col gap-4 mb-4">
                <p>
                    <b>Observación: </b> {observacion}
                </p>
                <p>
                    <b>Padre de la cría: </b> {padre_numero}
                </p>
                <p>
                    <b>Nombre de la cría: </b> {nombre}
                </p>
                <p>
                    <b>Numero de la cría: </b> {numero}
                </p>
                <p>
                    <b>Peso nacimiento de la cría: </b> {peso_nacimiento}
                </p>

                <p>
                    <b>Sexo de la cría: </b> {sexo}
                </p>
            </div>
        </LayoutModal>
    );
};
