import { auth } from '@/app/auth';
import { DetailsCattle, DetailsWeights } from '@/collections';
import { Details } from '@/components/details';
import { DropDownOptions } from '@/components/dropdown options';
import { DropdownStatesCattle } from '@/components/dropdown states cattle';
import { WeightsEditable } from '@/components/editable sections/weights';
import { TabDetailsCattle } from '@/components/tabsDetatilsCattle';
import { ResponseGanado, ResponseGanadoDescarte } from '@/types';
import { getData } from '@/utils/getData';
import { Session } from 'next-auth';
import Image from 'next/image';
import cattleImage from 'public/cattle.png';

type ParamsPageBeef = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPageBeef) {
    const { ganado_descarte,vacunaciones }: ResponseGanadoDescarte = await getData(
        'ganadoDescarte',
        'GET',
        undefined,
        params.id,
    );


    const session = await auth() as Session
    const role=session.user.rol

    const { numero, nombre, origen, fecha_nacimiento, pesos, tipo, estados,sexo,ganado_id } =
        ganado_descarte;

        /* en caso que el descarte sea hembra,se sobre entiende que fue una vaca
        por ende tiene todos estos datos  */
        let response={} as ResponseGanado;
        
    if(sexo== 'H' ){
          response = await getData('ganado', 'GET', undefined, params.id);
    }


    //comprobar si tiene estado vendido o fallecido para no editar pesos
    const checkState=estados.some(({estado})=>estado=='vendido'||estado=='fallecido')
    return (
        <>
            <div className="flex flex-col gap-8 p-2 sm:ml-6 md:p-4 items-center xl:ml-0">
                <div className="flex gap-2">
                    <h3 className=" font-bold text-2xl">
                        Detalle cabeza ganado descartado {numero}
                    </h3>
                   {!checkState &&  <DropDownOptions idCattle={ganado_id} optionType="cattle" role={role} disabledDiscardCattle />}

                    {/*  <ButtonGenerateReport report='ganado' id={ganado.id} /> */}
                </div>
                <div className="flex flex-col gap-5 md:flex-row items-center ">
                    <div className="">
                        {/*  imagen */}

                        <Image alt="cattle" src={cattleImage} />
                    </div>

                    {/*  detalles */}
                    <div className="flex">
                        <div className=" flex flex-wrap gap-4 bg-base-100 justify-between md:gap-y-4 p-4 shadow-[0px_0px_6px_-3px] shadow-primary rounded-md border-primary sm:grid grid-cols-2  sm:gap-6 lg:grid-cols-3 lg:justify-items-center ">
                            <Details
                                tittle={DetailsCattle.nombre}
                                content={nombre}
                            />
                            <Details
                                tittle={DetailsCattle.origen}
                                content={origen}
                            />
                            <Details
                                tittle={DetailsCattle.fecha_nacimiento}
                                content={fecha_nacimiento}
                            />
                            <Details
                                tittle={DetailsCattle.tipo}
                                content={tipo}
                            />
                            <Details
                                tittle={DetailsCattle.sexo}
                                content={sexo}
                            />
                            <div className="flex flex-col items-center">
                                <h3 className="font-bold text-lg">Estados</h3>
                                <DropdownStatesCattle estados={estados} />
                            </div>
                            {/* Pesos */}
                            <div className="flex flex-col gap-1 col-span-full m-auto sm:m-0 lg:m-0 lg:justify-self-stretch">
                            {pesos ? <WeightsEditable disableEdit={checkState} id={ganado_descarte.id} pesos={pesos} typeModelWeight={'descarte'}  />
                            
                            :<>
                            <h3 className="m-auto">Pesos</h3>
                            <div className="m-auto">No disponibles</div> 
                            </>}
                            </div>
                        </div>
                    </div>
                </div>
              {sexo =='M' ? ( <div className="w-full divide-y divide-primary/[.20]">
                    <TabDetailsCattle
                        vacunaciones={vacunaciones}
                        isMale={true}
                    />
                </div>) : ( <div className="w-full divide-y divide-primary/[.20]">
                    <TabDetailsCattle
                        revision_reciente={response.revision_reciente}
                        servicio_reciente={response.servicio_reciente}
                        total_revisiones={response.total_revisiones}
                        total_servicios={response.total_servicios}
                        efectividad={response.efectividad}
                        parto_reciente={response.parto_reciente}
                        total_partos={response.total_partos}
                        info_pesajes_leche={response.info_pesajes_leche}
                        vacunaciones={vacunaciones}
                        disabledSomeTabs={false}
                        isMale={false}
                        disableCreateButton
                        ganado_id={ganado_id}
                    />
                </div>)}
            </div>
        </>
    );
}
