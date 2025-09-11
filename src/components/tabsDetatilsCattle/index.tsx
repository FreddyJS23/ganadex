"use client";

import { Details } from "../details";
import {
  DetailsBirht,
  DetailsChecks,
  DetailsEfficiencyBull,
  DetailsServe,
  DetailsWeightingMilk,
} from "@/collections";
import { Eventos, ResponseGanado } from "@/types";
import { ContainerContentTab } from "./item";
import { Tabs, Tab } from "@nextui-org/tabs";
import { TitleTab } from "@/ui/TitleTab";
import { usePathname, useRouter } from "next/navigation";
import { ButtonGroupTabDetailCattle } from "@/ui/ButtonGroupTabDetailCattle";
import { headerHistoryVaccinesApply } from "@/collections/headerColums";
import { VaccinesAppliedCastle } from "../tables/vaccines Apply castle/index";
import { useState } from "react";
import { ModalHistoryVaccines } from "../modals/historys/history vaccines";
import Link from "next/link";
import { Button } from "@nextui-org/react";

type TabsDetailsCattleProps = Partial<Omit<ResponseGanado, "ganado">> & {
  eventos?: Eventos;
  /**Cuando la vaca no tiene un peso mínimo se desactiva algunas opciones */
  disabledSomeTabs?: boolean;
  isMale: boolean;
  servicio_toro?: {
    efectividad: number;
    padre_en_partos: number;
    servicios: number | null;
  };
  disableCreateButton?: boolean;
  /* Se debe acomodar la forma de ver el historial de operación para vacas o toros que se descarten */
  ganado_id?: number;
};

const ButonHistory = ({ url, id }: { url: string; id?: number }) => {
  const pathname = usePathname();
  const route = `${pathname}/${url}`;
  return (
    <Button
      as={Link}
      color="primary"
      /* Se debe acomodar la forma de ver el historial de operación para vacas o toros que se descarten */
      href={
        pathname.includes("ganado_descarte") ? `/ganado/${id}/${url}` : route
      }
      variant="solid"
    >
      Ver Historial
    </Button>
  );
};

export const TabDetailsCattle = ({
  revision_reciente,
  servicio_reciente,
  total_revisiones,
  total_servicios,
  total_servicios_acumulados,
  info_pesajes_leche,
  eventos,
  efectividad = 0,
  parto_reciente,
  total_partos,
  vacunaciones,
  disabledSomeTabs = true,
  isMale,
  disableCreateButton = false,
  ganado_id,
  servicio_toro,
}: TabsDetailsCattleProps) => {
  const router = useRouter();
  const pathname = usePathname();

  let disableTabs: Array<string> = [];

  if (isMale) {
    disableTabs = ["revisiones", "partos", "leche"];
  } else if (disabledSomeTabs) {
    disableTabs = ["servicios", "partos", "leche"];
  }

  return (
    <>
      {/* secciones */}
      <Tabs
        variant="underlined"
        color="primary"
        classNames={{
          tab: "font-bold h-12 group",
          tabList: "gap-0",
          cursor: "-bottom-1",
        }}
        size="lg"
        fullWidth={true}
        disabledKeys={disableTabs}
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
              content={
                <div>
                  {
                    /* diagnostico desconocido  */
                    typeof revision_reciente?.revision == "string" ? (
                      revision_reciente?.revision
                    ) : /* tiene diagnostico pero no tiene código */
                    !revision_reciente?.revision.codigo ? (
                      revision_reciente?.revision.tipo
                    ) : (
                      /* diagnostico tiene código */
                      <div className="flex gap-1">
                        <div className="flex">
                          <span className="text-primary font-bold">
                            {revision_reciente?.revision.codigo}
                          </span>
                          <span className="opacity-50">:</span>
                        </div>
                        <span className="">
                          {revision_reciente?.revision.tipo}
                        </span>
                      </div>
                    )
                  }
                </div>
              }
            />
            <Details
              tittle={DetailsChecks.observacion}
              content={revision_reciente?.observacion}
            />
            <Details
              tittle={DetailsChecks.tratamiento}
              content={revision_reciente?.tratamiento}
            />
            <Details
              tittle={DetailsChecks.vacuna}
              content={revision_reciente?.vacuna?.nombre}
            />
            <Details
              tittle={DetailsChecks.dosis}
              content={revision_reciente?.dosis}
            />
            <Details
              tittle={DetailsChecks.proxima}
              content={eventos?.prox_revision}
            />
            <Details
              tittle={DetailsChecks.totales}
              content={total_revisiones}
            />
            {disableCreateButton ? (
              <ButonHistory url="revision" id={ganado_id} />
            ) : (
              <div className="col-span-full place-self-center">
                <ButtonGroupTabDetailCattle route="revision" />
              </div>
            )}
          </ContainerContentTab>
        </Tab>
        <Tab
          key="servicios"
          title={<TitleTab title="Servicios" icon="serve" />}
        >
          <ContainerContentTab>
            {/* descripción servicios al ver un toro */}
            {servicio_toro ? (
              <>
                <Details
                  tittle={DetailsEfficiencyBull.padre_partos}
                  content={servicio_toro.padre_en_partos}
                />
                <Details
                  tittle={DetailsEfficiencyBull.servicios}
                  content={servicio_toro.servicios}
                />
                <Details
                  tittle={DetailsEfficiencyBull.efectividad}
                  content={servicio_toro.efectividad + "%"}
                />
              </>
            ) : (
              /* descripción servicios al ver una vaca */
              <>
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

                {servicio_reciente?.toro ? (
                  <Details
                    tittle={DetailsServe.numero_toro}
                    content={servicio_reciente?.toro.numero}
                  />
                ) : (
                  <Details
                    tittle={DetailsServe.pajuela}
                    content={servicio_reciente?.pajuela_toro?.codigo}
                  />
                )}

                <Details
                  tittle={DetailsServe.total_acumulado}
                  content={total_servicios_acumulados}
                />

                <Details
                  tittle={DetailsServe.totales}
                  content={total_servicios}
                />

                <Details
                  tittle={DetailsServe.efectividad}
                  content={efectividad ?? "0" + "%"}
                />
              </>
            )}
            {disableCreateButton ? (
              <ButonHistory url="servicio" id={ganado_id} />
            ) : (
              <div className="col-span-full place-self-center">
                <ButtonGroupTabDetailCattle route="servicio" />
              </div>
            )}
          </ContainerContentTab>
        </Tab>
        <Tab key="partos" title={<TitleTab title="Partos" icon="pregnant" />}>
          <ContainerContentTab>
            <Details
              tittle={DetailsBirht.fecha}
              content={parto_reciente?.fecha}
            />
            <Details
              tittle={DetailsBirht.observacion}
              content={parto_reciente?.observacion}
            />
            {/* se accede manualmente ya que los casos de que el array crías 
                        tenga mas de 1 elemento son demasiados pocos, pero existe. Para ver mas detalles si el parto tuvo varias crías
                        se deberá ir a la consulta del parto individual */}
            <Details
              tittle={DetailsBirht.numero_cria}
              content={parto_reciente?.crias[0].numero}
            />
            <Details
              tittle={DetailsBirht.sexo}
              content={parto_reciente?.crias[0].sexo}
            />

            <Details
              tittle={DetailsBirht.proximo}
              content={eventos?.prox_parto}
            />
            <Details tittle={DetailsBirht.totales} content={total_partos} />
            {disableCreateButton ? (
              <ButonHistory url="parto" id={ganado_id} />
            ) : (
              <div className="col-span-full place-self-center">
                <ButtonGroupTabDetailCattle route="parto" />
              </div>
            )}
          </ContainerContentTab>
        </Tab>
        <Tab
          key="leche"
          title={<TitleTab title="Pesajes de leche" icon="milk" />}
        >
          <ContainerContentTab>
            <Details
              tittle={DetailsWeightingMilk.ultimo}
              content={info_pesajes_leche?.reciente?.fecha}
            />
            <Details
              tittle={DetailsWeightingMilk.peso}
              content={`${info_pesajes_leche?.reciente?.pesaje ?? "0 "} kg`}
            />

            <Details
              tittle={DetailsWeightingMilk.dias_produccion}
              content={`${info_pesajes_leche?.dias_produccion ?? "0 "}`}
            />
            <Details
              tittle={DetailsWeightingMilk.produccion_acumulada}
              content={`${info_pesajes_leche?.produccion_acumulada ?? "0 "} kg`}
            />

            <Details
              tittle={DetailsWeightingMilk.mejor_pesaje}
              content={`${info_pesajes_leche?.mejor?.pesaje ?? "0 "} kg`}
            />
            <Details
              tittle={DetailsWeightingMilk.peor_pesaje}
              content={`${info_pesajes_leche?.peor?.pesaje ?? "0 "} kg`}
            />

            <Details
              tittle={DetailsWeightingMilk.estado_actual}
              content={info_pesajes_leche?.estado}
            />

            {disableCreateButton ? (
              <ButonHistory url="pesajes_leche" id={ganado_id} />
            ) : (
              <div className="col-span-full place-self-center">
                <ButtonGroupTabDetailCattle route="pesajes_leche" />
              </div>
            )}
          </ContainerContentTab>
        </Tab>

        <Tab
          key={"vacunas"}
          title={<TitleTab title="Vacunas" icon="vaccine" />}
        >
          <ContainerContentTab>
            <div className="grid grid-cols-6 items-center gap-8 w-full">
              <div className="col-span-5">
                {vacunaciones ? (
                  <VaccinesAppliedCastle vacunaciones={vacunaciones.vacunas} />
                ) : (
                  <div className="text-center">Sin registro de vacunas</div>
                )}
              </div>
              {vacunaciones ? (
                <ModalHistoryVaccines historial={vacunaciones.historial} />
              ) : (
                <div className="text-center">Sin historial de vacunas</div>
              )}
            </div>
          </ContainerContentTab>
        </Tab>
      </Tabs>
    </>
  );
};
