'use client';

import { Details } from '../details';
import { DetailsChecks, DetailsServe, iconsSidebar } from '@/collections';
import {
    Parto,
    PesajeLecheGanado,
    ResponseGanado,
    Revision,
    Revisiones,
    Servicio,
    Servicios,
} from '@/types';
import { ContainerContentTab } from './item';
import { Tabs, Tab } from '@nextui-org/tabs';
import { TitleTab } from '@/ui/TitleTab';
import { Button } from '@/ui/Button';
import { UseDisclosureProps, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { ModalHistoryServices } from '../modals/history services';
import { ModalHistoryCheckUps } from '../modals/history checkups';
import { ModalHistoryMilk } from '../modals/history prices milk';
import { ModalHistoryBirths } from '../modals/history births';
import { ModalHistoryWeightMilk } from '../modals/history weight milk';

type TabsDetailsCattleProps = Omit<ResponseGanado, 'ganado'>;

export const TabDetailsCattle = ({
    revision_reciente,
    servicio_reciente,
    total_revisiones,
    total_servicios,
}: TabsDetailsCattleProps) => {
    const fakeRevisiones = [
        {
            id: 43564,
            fecha: new Date('2023-11-23'),
            diagnostico: 'totam-aspernatur-soluta-eius',
            tratamiento: 'suscipit-eum',
        },
        {
            id: 434,
            fecha: new Date('2023-11-23'),
            diagnostico: 'totam-aspernatur-soluta-eius',
            tratamiento: 'suscipit-eum',
        },
    ];
    const fakeServicios = [
        {
            id: 88928,
            fecha: new Date('2023-03-31'),
            observacion: 'molestias-aperiam',
            tipo: 'neque-quaerat-soluta-corrupti-hic',
            numero_toro: 889,
        },
        {
            id: 885361378928,
            fecha: new Date('2023-03-31'),
            observacion: 'molestias-aperiam',
            tipo: 'neque-quaerat-soluta-corrupti-hic',
            numero_toro: 889,
        },
    ];
    const fakePesajesLeche:PesajeLecheGanado[] = [
        {
            id: 90,
            pesaje: '54-KG',
            fecha: new Date('2023-12-04'),
        },
        {
            id: 9080,
            pesaje: '44-KG',
            fecha: new Date('2023-12-04'),
        },
    ];
    const fakePartos:Parto[] = [
        {
            id: 221008,
            fecha: new Date('2023-11-27'),
            observacion: 'placeat-repellate',
            cria: {
                id: 1364,
                nombre: 'excepturi-amet-saepe-consequuntur',
                numero: null,
                sexo: 'M',
                origen: null,
                peso_nacimiento: '442-KG',
                fecha_nacimiento: null,
            },
            padre_numero: 7624,
        },
        {
            id: 22108,
            fecha: new Date('2023-11-27'),
            observacion: 'placeat-repellat-harum-iste',
            cria: {
                id: 14464,
                nombre: 'excepturi-amet-saepe-consequuntur',
                numero: null,
                sexo: 'M',
                origen: null,
                peso_nacimiento: '442-KG',
                fecha_nacimiento: null,
            },
            padre_numero: 74624,
        },
    ];

    const modalRevision = useDisclosure();
    const modalServicio = useDisclosure();
    const modalPesajeLeche = useDisclosure();
    const modalPartos = useDisclosure();

    const [dataModalRevisiones, setDataModalRevisiones] =
        useState<Revision[]>();
    const [dataModalServicios, setDataModalServicios] = useState<Servicio[]>();
    const [dataModalPesasjeLeche, setDataModalPesasjeLeche] = useState<PesajeLecheGanado[]>();
    const [dataModalPartos, setDataModalPartos] = useState<Parto[]>();


    const openModalRevisiones = (revisiones?: Revision[]) => {
        setDataModalRevisiones(revisiones);
        modalRevision.onOpen();
    };
    const openModalServicios = (servicios?: Servicio[]) => {
        setDataModalServicios(servicios);
        modalServicio.onOpen();
    };
    const openModalPesajesLeche = (pesajesLeche?: PesajeLecheGanado[]) => {
        setDataModalPesasjeLeche(pesajesLeche);
        modalPesajeLeche.onOpen();
    };
    const openModalPartos = (partos?: Parto[]) => {
        setDataModalPartos(partos);
        modalPartos.onOpen();
    };


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
                        <div className="col-span-full place-self-center">
                            <Button
                                onClick={() =>
                                    openModalRevisiones(fakeRevisiones)
                                }
                                content="Ver historial"
                            />
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
                        <div className="col-span-full place-self-center">
                            <Button
                                onClick={() =>
                                    openModalServicios(fakeServicios)
                                }
                                content="Ver historial"
                            />
                        </div>
                    </ContainerContentTab>
                </Tab>
                <Tab
                    key="partos"
                    title={<TitleTab title="Partos" icon="pregnant" />}
                >
                    <div className="col-span-full place-self-center">
                        <Button
                            onClick={() => openModalPartos(fakePartos)}
                            content="Ver historial"
                        />
                    </div>
                </Tab>
                <Tab
                    key="leche"
                    title={<TitleTab title="Pesajes de leche" icon="milk" />}
                >
                    <div className="col-span-full place-self-center">
                        <Button
                            onClick={() => openModalPesajesLeche(fakePesajesLeche)}
                            content="Ver historial"
                        />
                    </div>
                </Tab>
            </Tabs>

            {dataModalServicios && (
                <ModalHistoryServices
                    isOpen={modalServicio.isOpen}
                    onOpen={modalServicio.onOpen}
                    onOpenChange={modalServicio.onOpenChange}
                    servicios={dataModalServicios}
                    onClose={modalServicio.onClose}
                />
            )}

            {dataModalRevisiones && (
                <ModalHistoryCheckUps
                    isOpen={modalRevision.isOpen}
                    onOpen={modalRevision.onOpen}
                    onOpenChange={modalRevision.onOpenChange}
                    revisiones={dataModalRevisiones}
                    onClose={modalRevision.onClose}
                />
            )}
            {dataModalPesasjeLeche && (
                <ModalHistoryWeightMilk
                    isOpen={modalPesajeLeche.isOpen}
                    onOpen={modalPesajeLeche.onOpen}
                    onOpenChange={modalPesajeLeche.onOpenChange}
                    pesajes_leche={dataModalPesasjeLeche}
                    onClose={modalPesajeLeche.onClose}
                />
            )}
            {dataModalPartos && (
                <ModalHistoryBirths
                    isOpen={modalPartos.isOpen}
                    onOpen={modalPartos.onOpen}
                    onOpenChange={modalPartos.onOpenChange}
                    partos={dataModalPartos}
                    onClose={modalPartos.onClose}
                />
            )}
        </>
    );
};
