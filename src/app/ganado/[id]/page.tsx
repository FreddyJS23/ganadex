import { DetailsCattle, DetailsWeights } from '@/collections';
import { Details } from '@/components/details';
import { TabDetailsCattle } from '@/components/tabsDetatilsCattle';
import { ResponseGanado } from '@/types';
import { getData } from '@/utils/getData';
import Image from 'next/image';
import cattleImage from 'public/cattle.png';

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
    }: ResponseGanado = await getData('response_ganado', params.id);

    return (
        <>
            <div className="flex flex-col gap-8 p-2 sm:ml-6 md:p-4 items-center xl:ml-0">
                <h3 className=" font-bold text-2xl">
                    Detalle del animal {ganado.numero}
                </h3>
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
                            <div className="flex flex-col">
                                <h3>Estados</h3>
                                <div className="flex-wrap">
                                    {ganado.estados.map(({ estado, id }) => (
                                        <div
                                            key={id}
                                            className="badge badge-primary"
                                        >
                                            {estado}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Pesos */}
                            <div className="flex flex-col gap-1 col-span-full m-auto sm:m-0 lg:m-0 lg:justify-self-stretch">
                                <h3 className="self-center text-xl font-bold">
                                    Pesos
                                </h3>
                                <div className="flex gap-6 flex-wrap justify-between sm:gap-4">
                                    <Details
                                        tittle={DetailsWeights.peso_nacimiento}
                                        content={ganado.peso_nacimiento}
                                    />
                                    <Details
                                        tittle={DetailsWeights.peso_destete}
                                        content={ganado.peso_destete}
                                    />
                                    <Details
                                        tittle={DetailsWeights.peso_2year}
                                        content={ganado.peso_2year}
                                    />
                                    <Details
                                        tittle={DetailsWeights.peso_actual}
                                        content={ganado.peso_actual}
                                    />
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
                    />
                </div>
            </div>
        </>
    );
}
