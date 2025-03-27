import { auth } from '@/app/auth';
import {
    DetailsCattle,
    DetailsEfficiencyBull,
    DetailsWeights,
} from '@/collections';
import { Details } from '@/components/details';
import { DropdownStatesCattle } from '@/components/dropdown states cattle';
import { WeightsEditable } from '@/components/editable sections/weights';
import { TabDetailsCattle } from '@/components/tabsDetatilsCattle';
import { ResponseToro } from '@/types';
import { getData } from '@/utils/getData';
import { Session } from 'next-auth';
import Image from 'next/image';
import cattleImage from 'public/cattle.png';

type ParamsPageBull = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPageBull) {
    const { toro,vacunaciones }: ResponseToro = await getData(
        'toro',
        'GET',
        undefined,
        params.id,
    );

    const {
        numero,
        nombre,
        origen,
        fecha_nacimiento,
        efectividad,
        padre_en_partos,
        pesos,
        servicios,
        tipo,
        estados,
    } = toro;

    const session = await auth() as Session
    const role=session.user.rol



    //comprobar si tiene estado vendido o fallecido para no editar pesos
    const chechkState=estados.some(({estado})=>estado=='vendido'||estado=='fallecido')
    //activar o desactivar el boton de editar pesos
    let disableEditWeight=false
    if(role== 'veterinario') disableEditWeight=true
    else if(chechkState) disableEditWeight=true
    return (
        <>
            <div className="flex flex-col gap-8 p-2 sm:ml-6 md:p-4 items-center xl:ml-0">
                <div className="flex gap-2">
                    <h3 className=" font-bold text-2xl">
                        Detalle del toro {numero}
                    </h3>
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

                            <div className="flex flex-col items-center">
                                <h3 className="font-bold text-lg">Estados</h3>
                                <DropdownStatesCattle estados={estados} />
                            </div>
                            {/* Pesos */}
                            <div className="flex flex-col gap-1 col-span-full m-auto sm:m-0 lg:m-0 lg:justify-self-stretch">
                               
                            {pesos ? <WeightsEditable typeCattle={tipo} disableEdit={disableEditWeight} id={toro.id} pesos={pesos} typeModelWeight={'toro'}  />
                            
                            :<>
                            <h3 className="m-auto">Pesos</h3>
                            <div className="m-auto">No disponibles</div> 
                            </>}
                            </div>
                            {/*Eficiencia */}
                            <div className="flex flex-col gap-1 col-span-full m-auto sm:m-0 lg:m-0 lg:justify-self-stretch">
                                <h3 className="self-center text-xl font-bold">
                                    Eficiencia
                                </h3>
                                <div className="flex gap-6 flex-wrap justify-between sm:gap-4">
                                    <Details
                                        tittle={
                                            DetailsEfficiencyBull.padre_partos
                                        }
                                        content={padre_en_partos}
                                    />
                                    <Details
                                        tittle={DetailsEfficiencyBull.servicios}
                                        content={servicios}
                                    />
                                    <Details
                                        tittle={
                                            DetailsEfficiencyBull.efectividad
                                        }
                                        content={efectividad + '%'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full divide-y divide-primary/[.20]">
                    <TabDetailsCattle
                        vacunaciones={vacunaciones}
                        isMale={true}
                        disableCreateButton
                    />
                </div>
            </div>
        </>
    );
}
