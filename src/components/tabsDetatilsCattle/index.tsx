'use client';

import { Details } from '../details';
import { DetailsBirht, DetailsChecks, DetailsServe, DetailsWeightingMilk } from '@/collections';
import { Eventos, ResponseGanado } from '@/types';
import { ContainerContentTab } from './item';
import { Tabs, Tab } from '@nextui-org/tabs';
import { TitleTab } from '@/ui/TitleTab';
import { Button } from '@/ui/Button';
import {  usePathname, useRouter } from 'next/navigation';
import { ButtonGroupTabDetailCattle } from '@/ui/ButtonGroupTabDetailCattle';

type TabsDetailsCattleProps = Omit<ResponseGanado, 'ganado'> & {eventos:Eventos};

export const TabDetailsCattle = ({
    revision_reciente,
    servicio_reciente,
    total_revisiones,
    total_servicios,
    info_pesajes_leche,
    eventos,
    efectividad,
    parto_reciente,
    total_partos,
}: TabsDetailsCattleProps) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            {/* secciones */}
            <Tabs
                variant="underlined"
                color="primary"
                classNames={{
                    tab: 'font-bold h-12 group',
                    tabList: 'gap-0',
                    cursor: '-bottom-1',
                }}
                size="lg"
                fullWidth={true}
            >
                <Tab
                    key="revisiones"
                    title={<TitleTab title="Revisiones" icon="checkUp" />}
                >
                    <ContainerContentTab>
                        <Details
                            tittle={DetailsChecks.fecha}
                            content={revision_reciente?.fecha}
                        />
                        <Details
                            tittle={DetailsChecks.diagnostico}
                            content={revision_reciente?.diagnostico}
                        />
                        <Details
                            tittle={DetailsChecks.tratamiento}
                            content={revision_reciente?.tratamiento}
                        />
                        <Details
                            tittle={DetailsChecks.proxima}
                            content={eventos.prox_revision}
                        />
                        <Details
                            tittle={DetailsChecks.totales}
                            content={total_revisiones}
                        />
                        <div className="col-span-full place-self-center">
                            <ButtonGroupTabDetailCattle route="revision" />
                        </div>
                    </ContainerContentTab>
                </Tab>
                <Tab
                    key="servicios"
                    title={<TitleTab title="Servicios" icon="serve" />}
                >
                    <ContainerContentTab>
                        <Details
                            tittle={DetailsServe.fecha}
                            content={servicio_reciente?.fecha}
                        />
                        <Details
                            tittle={DetailsServe.observacion}
                            content={servicio_reciente?.observacion}
                        />
                        <Details
                            tittle={DetailsServe.tipo}
                            content={servicio_reciente?.tipo}
                        />
                        <Details
                            tittle={DetailsServe.numero_toro}
                            content={servicio_reciente?.toro.numero}
                        />

                        <Details
                            tittle={DetailsServe.totales}
                            content={total_servicios}
                        />
                        <Details
                            tittle={DetailsServe.efectividad}
                            content={efectividad + '%'}
                        />
                        <div className="col-span-full place-self-center">
                            <ButtonGroupTabDetailCattle route="servicio" />
                        </div>
                    </ContainerContentTab>
                </Tab>
                <Tab
                    key="partos"
                    title={<TitleTab title="Partos" icon="pregnant" />}
                >
                    <ContainerContentTab>
                        <Details
                            tittle={DetailsBirht.fecha}
                            content={parto_reciente?.fecha}
                        />
                        <Details
                            tittle={DetailsBirht.observacion}
                            content={parto_reciente?.observacion}
                        />
                        <Details
                            tittle={DetailsBirht.numero_cria}
                            content={parto_reciente?.cria.numero}
                        />
                        <Details
                            tittle={DetailsBirht.sexo}
                            content={parto_reciente?.cria.sexo}
                        />

                        <Details
                            tittle={DetailsBirht.proximo}
                            content={eventos.prox_parto}
                        />
                        <Details
                            tittle={DetailsBirht.totales}
                            content={total_partos}
                        />
                        <div className="col-span-full place-self-center">
                            <ButtonGroupTabDetailCattle route="parto" />
                        </div>
                    </ContainerContentTab>
                </Tab>
                <Tab
                    key="leche"
                    title={<TitleTab title="Pesajes de leche" icon="milk" />}
                >
                    <ContainerContentTab>
                        <Details
                            tittle={DetailsWeightingMilk.ultimo}
                            content={info_pesajes_leche.reciente?.fecha}
                        />
                        <Details
                            tittle={DetailsWeightingMilk.peso}
                            content={info_pesajes_leche.reciente?.pesaje + 'kg'}
                        />
                        <Details
                            tittle={DetailsWeightingMilk.mejor_pesaje}
                            content={info_pesajes_leche.mejor?.pesaje + 'kg'}
                        />
                        <Details
                            tittle={DetailsWeightingMilk.peor_pesaje}
                            content={info_pesajes_leche.peor?.pesaje + 'kg'}
                        />

                        <Details
                            tittle={DetailsWeightingMilk.estado_actual}
                            content={info_pesajes_leche.estado}
                        />

                        <div className="col-span-full place-self-center">
                            <ButtonGroupTabDetailCattle route="pesajes_leche" />
                        </div>
                    </ContainerContentTab>
                </Tab>
            </Tabs>
        </>
    );
};
