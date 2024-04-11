'use client';

import { LayoutModal } from '..';
import { ModalProps, Parto,  } from '@/types';

export const ModalBirth = ({ parto }: ModalProps & { parto: Parto }) => {
    const { cria, fecha, observacion, padre_toro,veterinario } = parto;
    const { nombre, numero, sexo, peso } = cria;
   
    return (
        <LayoutModal
            icon="pregnancy"
            titleModal={'Parto del '}
            footer={false}
            isOpen={true}
            dataHeader={typeof fecha == 'string' ? fecha : ''}
        >
            <div className="flex flex-col gap-4 mb-4">
                <p>
                    <b>Observación: </b> {observacion}
                </p>
                <p>
                    <b>Padre de la cría: </b> {padre_toro.numero}
                </p>
                <p>
                    <b>Nombre de la cría: </b> {nombre}
                </p>
                <p>
                    <b>Numero de la cría: </b> {numero}
                </p>
                <p>
                    <b>Peso nacimiento de la cría: </b> {peso.peso_nacimiento}
                </p>

                <p>
                    <b>Sexo de la cría: </b> {sexo}
                </p>
            </div>
        </LayoutModal>
    );
};
