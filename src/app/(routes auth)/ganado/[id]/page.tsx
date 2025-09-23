import { DetailsCattle } from "@/collections";
import { Details } from "@/components/details";
import { DropdownStatesCattle } from "@/components/dropdowns/dropdown states cattle";
import { TabDetailsCattle } from "@/components/tabs/tabsDetatilsCattle";
import type { ResponseGanado } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";
import Image from "next/image";
import cattleImage from "public/cattle.png";
import { DropDownOptions } from "@/components/dropdowns/dropdown options";
import { auth } from "@/app/auth";
import type { Session } from "next-auth";
import { WeightsEditable } from "@/components/editable sections/weights";
import { ModalEditAnimal } from "@/components/modals/edits/edit animals";

type ParamsPageCattle = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPageCattle) {
  const response = await getData<ResponseGanado>({
    endPoint: "ganado",
    id: params.id,
  });
  const {
    ganado,
    revision_reciente,
    servicio_reciente,
    total_revisiones,
    total_servicios_acumulados,
    total_servicios,
    efectividad,
    parto_reciente,
    total_partos,
    info_pesajes_leche,
    vacunaciones,
  } = responseErrorServer(response);

  const { eventos } = ganado;

  const session = (await auth()) as Session;
  const role = session.user.rol;
  let disabledSomeTabs = true;
  if (ganado.pesos?.peso_actual) {
    if (
      Number.parseInt(ganado.pesos?.peso_actual) >=
      session.user.configuracion.peso_servicio
    )
      disabledSomeTabs = false;
    else disabledSomeTabs = true;
  }
  //comprobar si tiene estado vendido o fallecido para no editar pesos
  const chechkState = ganado.estados.some(
    ({ estado }) => estado == "vendido" || estado == "fallecido",
  );
  //activar o desactivar el boton de editar pesos
  let disableEditWeight = false;
  if (role == "veterinario") disableEditWeight = true;
  else if (chechkState) disableEditWeight = true;

  return (
    <>
      <div className="flex flex-col gap-8 p-2  items-center ">
        <div className="flex gap-6">
          <h3 className=" font-bold text-2xl">
            Detalles de la vaca {ganado.numero}
          </h3>
          {!chechkState && (
            <DropDownOptions
              idCattle={ganado.id}
              optionType="cattle"
              role={role}
            />
          )}
        </div>
        <div className="flex flex-col gap-5 md:flex-row items-center ">
          <div className="">
            {/*  imagen */}

            <Image alt="cattle" src={cattleImage} />
          </div>

          {/*  detalles */}
          <div className="flex relative">
            <div className=" flex flex-wrap gap-4 bg-base-100 justify-between md:gap-y-4 p-4 shadow-[0px_0px_6px_-3px] shadow-primary rounded-md border-primary sm:grid grid-cols-2  sm:gap-6 lg:grid-cols-3 lg:justify-items-center ">
              {/* boton flotante y modal para editar */}
              {role == "admin" && !disableEditWeight && (
                <ModalEditAnimal type={"Vaca"} ganado={ganado} />
              )}

              <Details tittle={DetailsCattle.nombre} content={ganado.nombre} />
              <Details tittle={DetailsCattle.origen} content={ganado.origen} />

              {ganado.fallecimiento && (
                <>
                  <Details
                    tittle={DetailsCattle.fecha_fallecimiento}
                    content={ganado.fallecimiento.fecha}
                  />
                  <Details
                    tittle={DetailsCattle.causa_fallecimiento}
                    content={ganado.fallecimiento.causa}
                  />
                  <Details
                    tittle={DetailsCattle.descripcion_fallecimiento}
                    content={ganado.fallecimiento.descripcion}
                  />
                </>
              )}
              {ganado.venta && (
                <>
                  <Details
                    tittle={DetailsCattle.fecha_venta}
                    content={ganado.venta.fecha}
                  />
                  <Details
                    tittle={DetailsCattle.comprador}
                    content={ganado.venta.comprador}
                  />
                </>
              )}
              {ganado.fecha_ingreso && (
                <Details
                  tittle={DetailsCattle.fecha_ingreso}
                  content={ganado.fecha_ingreso}
                />
              )}

              <Details
                tittle={DetailsCattle.fecha_nacimiento}
                content={ganado.fecha_nacimiento}
              />

              <Details tittle={DetailsCattle.tipo} content={ganado.tipo} />
              <div className="flex flex-col items-center">
                <h3 className="font-bold text-lg">Estados</h3>
                <DropdownStatesCattle estados={ganado.estados} />
              </div>
              {/* Pesos */}
              <div className="flex flex-col gap-1 col-span-full m-auto sm:m-0 lg:m-0 lg:justify-self-stretch">
                {ganado.pesos ? (
                  <WeightsEditable
                    typeCattle={ganado.tipo}
                    disableEdit={disableEditWeight}
                    id={ganado.id}
                    pesos={ganado.pesos}
                    typeModelWeight={"ganado"}
                    weightConfig={session.user.configuracion.peso_servicio}
                  />
                ) : (
                  <>
                    <h3 className="m-auto">Pesos</h3>
                    <div className="m-auto">No disponibles</div>
                  </>
                )}
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
            total_servicios_acumulados={total_servicios_acumulados}
            eventos={eventos}
            efectividad={efectividad}
            parto_reciente={parto_reciente}
            total_partos={total_partos}
            info_pesajes_leche={info_pesajes_leche}
            vacunaciones={vacunaciones}
            disabledSomeTabs={disabledSomeTabs}
            isMale={false}
            disableCreateButton={chechkState}
          />
        </div>
      </div>
    </>
  );
}
