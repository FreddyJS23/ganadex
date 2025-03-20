'use client';

import { RedirectInTable } from '@/components/redirectsInTables';
import { LayoutModal } from '..';
import { ModalProps, Parto } from '@/types';

export const ModalBirth = ({ parto }: ModalProps & { parto: Parto }) => {
    const { crias, fecha, observacion, padre_toro, pajuela_toro, personal } =
        parto;

        //si hay mas de dos crias en el parto
        const gemelos=crias.length > 1

        const typeBaby=(id:number,toro_id:number | null,descarte_id:number | null,numero:number | null)=>{
           let redirect:"ganado" | "toros" | "ganado_descarte"='ganado'

           if(toro_id){
            id=toro_id
            redirect='toros'
           }
           else if(descarte_id){
            id=descarte_id
            redirect="ganado_descarte"
           }
           
           return <RedirectInTable label={numero} id={id} redirect={redirect} />
        }

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
                    <b>Observación del parto: </b> {observacion}
                </p>
                <p className='flex gap-1'>
                    <b>Padre de la cría: </b>{' '}
                    {padre_toro ? <RedirectInTable id={padre_toro.id} label={padre_toro.numero} redirect='toros' /> : pajuela_toro?.codigo}
                </p>
                {crias.map(
                    ({
                        nombre,
                        numero,
                        peso_nacimiento,
                        sexo,
                        observacion,
                        id,
                        toro_id,
                        descarte_id,
                    },index) => {
                        return (
                            <>
                                {/* al ser dos crias se coloca una numeracion a cada una */}
                                {gemelos && <b>Cría #{index + 1}</b>}
                                
                                <p>
                                    <b>Nombre de la cría: </b> {nombre}
                                </p>
                                <p className='flex gap-1'>
                                    <b>Numero de la cría: </b> {typeBaby(id,toro_id,descarte_id,numero)}
                                </p>
                                <p>
                                    <b>Peso nacimiento de la cría: </b>
                                    {peso_nacimiento + ' kg'}
                                </p>
                                <p>
                                    <b>Sexo de la cría: </b> {sexo}
                                </p>
                                <p>
                                    <b>Observación de la cría: </b> {observacion}
                                </p>
                            </>
                        );
                    },
                )}

                <p>
                    <b>{personal.cargo == 'veterinario' ? 'Veterinario ' : 'Obrero '} que atendió el parto: </b>{' '}
                    {personal.nombre}
                </p>
            </div>
        </LayoutModal>
    );
};
