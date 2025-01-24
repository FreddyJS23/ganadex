import { DetailsCattle, DetailsWeights } from '@/collections';
import { Details } from '@/components/details';
import { DropdownStatesCattle } from '@/components/dropdown states cattle';
import { TabDetailsCattle } from '@/components/tabsDetatilsCattle';
import { ResponseGanado } from '@/types';
import { getData } from '@/utils/getData';
import Image from 'next/image';
import Link from 'next/link';
import cattleImage from 'public/cattle.png';
import { DropDownOptions } from '@/components/dropdown options';
import { auth } from '@/app/auth';
import { Session } from 'next-auth';

type ParamsPageCattle = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPageCattle) {
    const {
        ganado,
        revision_reciente,
        servicio_reciente,
        total_revisiones,
        total_servicios,
        efectividad,
        parto_reciente,
        total_partos,
        info_pesajes_leche,
        vacunaciones
    }: ResponseGanado = await getData('ganado', 'GET', undefined, params.id);

    const { eventos } = ganado;

    const session = await auth() as Session
    const role=session.user.rol
    return (
        <>
            <div className="flex flex-col gap-8 p-2 sm:ml-6 md:p-4 items-center xl:ml-0">
                <div className="flex gap-6">
                    <h3 className=" font-bold text-2xl">
                        Detalle del animal {ganado.numero}
                    </h3>
                    <DropDownOptions idCattle={ganado.id} optionType="cattle" role={role} />
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
                                content={ganado.nombre}
                            />
                            <Details
                                tittle={DetailsCattle.origen}
                                content={ganado.origen}
                            />
                            <Details
                                tittle={DetailsCattle.sexo}
                                content={ganado.sexo}
                            />
                            <Details
                                tittle={DetailsCattle.fecha_nacimiento}
                                content={ganado.fecha_nacimiento}
                            />
                            <Details
                                tittle={DetailsCattle.tipo}
                                content={ganado.tipo}
                            />
                            <div className="flex flex-col items-center">
                                <h3 className="font-bold text-lg">Estados</h3>
                                <DropdownStatesCattle
                                    estados={ganado.estados}
                                />
                            </div>
                            {/* Pesos */}
                            <div className="flex flex-col gap-1 col-span-full m-auto sm:m-0 lg:m-0 lg:justify-self-stretch">
                                <h3 className="self-center text-xl font-bold">
                                    Pesos
                                </h3>
                                <div className="flex gap-6 flex-wrap justify-between sm:gap-4">
                                    {ganado.pesos ? (
                                        <>
                                            <Details
                                                tittle={
                                                    DetailsWeights.peso_nacimiento
                                                }
                                                content={
                                                    ganado.pesos
                                                        ?.peso_nacimiento ?? ''
                                                }
                                            />
                                            <Details
                                                tittle={
                                                    DetailsWeights.peso_destete
                                                }
                                                content={
                                                    ganado.pesos
                                                        ?.peso_destete ?? ''
                                                }
                                            />
                                            <Details
                                                tittle={
                                                    DetailsWeights.peso_2year
                                                }
                                                content={
                                                    ganado.pesos?.peso_2year ??
                                                    ''
                                                }
                                            />
                                            <Details
                                                tittle={
                                                    DetailsWeights.peso_actual
                                                }
                                                content={
                                                    ganado.pesos?.peso_actual ??
                                                    ''
                                                }
                                            />
                                        </>
                                    ) : (
                                        <div className="m-auto">
                                            No disponibles
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full divide-y divide-primary/[.20]">
                    <TabDetailsCattle
                        revision_reciente={revision_reciente}
                        servicio_reciente={servicio_reciente}
                        total_revisiones={total_revisiones}
                        total_servicios={total_servicios}
                        eventos={eventos}
                        efectividad={efectividad}
                        parto_reciente={parto_reciente}
                        total_partos={total_partos}
                        info_pesajes_leche={info_pesajes_leche}
                        vacunaciones={vacunaciones}
                    />
                </div>
            </div>
        </>
    );
}
