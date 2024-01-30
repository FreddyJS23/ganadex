'use client'

import { Details } from '../details';
import { DetailsChecks, DetailsServe, iconsSidebar } from '@/collections';
import { ResponseGanado } from '@/types';
import { ContainerContentTab } from './item';
import { Tabs, Tab } from '@nextui-org/tabs';
import { TitleTab } from '@/ui/TitleTab';

type TabsDetailsCattleProps = Omit<ResponseGanado, 'ganado'>;

export const TabDetailsCattle = ({
    revision_reciente,
    servicio_reciente,
    total_revisiones,
    total_servicios,
}: TabsDetailsCattleProps) => {
 
   
    return (
        <>
            {/* secciones */}
            <Tabs
                variant="underlined"
                color="primary"
                classNames={{ tab: 'font-bold h-12 group',tabList:'gap-0',cursor:'-bottom-1' }}
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
                            content={'2023-32-23'}
                        />
                        <Details
                            tittle={DetailsChecks.ultima_realizada}
                            content={'15 dias'}
                        />
                        <Details
                            tittle={DetailsChecks.totales}
                            content={total_revisiones}
                        />
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
                            content={341}
                        />

                        <Details
                            tittle={DetailsServe.totales}
                            content={total_servicios}
                        />
                        <Details
                            tittle={DetailsServe.efectividad}
                            content={'70%'}
                        />
                    </ContainerContentTab>
                </Tab>
                <Tab
                    key="partos"
                    title={<TitleTab title="Partos" icon="pregnant" />}
                ></Tab>
                <Tab
                    key="leche"
                    title={<TitleTab title="Pesajes de leche" icon="milk" />}
                ></Tab>
            </Tabs>
        </>
    );
};
