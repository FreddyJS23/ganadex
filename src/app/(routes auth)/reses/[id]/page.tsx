import { DetailsCattle, DetailsWeights } from '@/collections';
import { Details } from '@/components/details';
import { DropdownStatesCattle } from '@/components/dropdown states cattle';
import {  ResponseRes, } from '@/types';
import { getData } from '@/utils/getData';
import Image from 'next/image';
import cattleImage from 'public/cattle.png';

type ParamsPageBeef = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPageBeef) {
    const {res}: ResponseRes = await getData('res', 'GET', undefined, params.id);

    const {numero,nombre,origen,fecha_nacimiento,pesos,tipo,estados} = res;
console.log(estados)
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
                                <DropdownStatesCattle
                                    estados={estados}
                                />
                            </div>
                            {/* Pesos */}
                            <div className="flex flex-col gap-1 col-span-full m-auto sm:m-0 lg:m-0 lg:justify-self-stretch">
                                <h3 className="self-center text-xl font-bold">
                                    Pesos
                                </h3>
                                <div className="flex gap-6 flex-wrap justify-between sm:gap-4">
                                    {pesos ? (
                                        <>
                                            <Details
                                                tittle={
                                                    DetailsWeights.peso_nacimiento
                                                }
                                                content={
                                                    pesos?.peso_nacimiento ?? ''
                                                }
                                            />
                                            <Details
                                                tittle={
                                                    DetailsWeights.peso_destete
                                                }
                                                content={
                                                    pesos?.peso_destete ?? ''
                                                }
                                            />
                                            <Details
                                                tittle={
                                                    DetailsWeights.peso_2year
                                                }
                                                content={
                                                    pesos?.peso_2year ?? ''
                                                }
                                            />
                                            <Details
                                                tittle={
                                                    DetailsWeights.peso_actual
                                                }
                                                content={
                                                    pesos?.peso_actual ?? ''
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
            </div>
        </>
    );
}
