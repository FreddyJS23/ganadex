import { auth } from "@/app/auth";
import { DetailsCattle } from "@/collections";
import { Details } from "@/components/details";
import { DropDownOptions } from "@/components/dropdown options";
import { DropdownStatesCattle } from "@/components/dropdown states cattle";
import { WeightsEditable } from "@/components/editable sections/weights";
import { ModalEditAnimal } from "@/components/modals/edit animals";
import { TabDetailsCattle } from "@/components/tabsDetatilsCattle";
import { ResponseGanado, ResponseGanadoDescarte } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";
import { Session } from "next-auth";
import Image from "next/image";
import cattleImage from "public/cattle.png";

type ParamsPageBeef = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPageBeef) {
  const response = await getData<ResponseGanadoDescarte>({
    endPoint: "ganadoDescarte",
    id: params.id,
  });
  const { ganado_descarte, vacunaciones } = responseErrorServer(response);

  const session = (await auth()) as Session;
  const role = session.user.rol;

  const {
    numero,
    nombre,
    origen,
    fecha_nacimiento,
    pesos,
    tipo,
    estados,
    sexo,
    ganado_id,
  } = ganado_descarte;

  /* en caso que el descarte sea hembra,se sobre entiende que fue una vaca
        por ende tiene todos estos datos  */
  let responseHembra = {} as ResponseGanado;

  if (sexo == "H") {
    const fetch = await getData<ResponseGanado>({
      endPoint: "ganado",
      id: params.id,
    });
    responseHembra = responseErrorServer(fetch);
  }

  //comprobar si tiene estado vendido o fallecido para no editar pesos
  const chechkState = estados.some(
    ({ estado }) => estado == "vendido" || estado == "fallecido",
  );
  //activar o desactivar el boton de editar pesos
  let disableEditWeight = false;
  if (role == "veterinario") disableEditWeight = true;
  else if (chechkState) disableEditWeight = true;

  return (
    <>
      <div className="flex flex-col gap-8 items-center ">
        <div className="flex gap-2">
          <h3 className=" font-bold text-2xl">
            Detalles cabeza ganado descartado {numero}
          </h3>
          {!chechkState && (
            <DropDownOptions
              idCattle={ganado_id}
              optionType="cattle"
              role={role}
              disabledDiscardCattle
            />
          )}

          {/*  <ButtonGenerateReport report='ganado' id={ganado.id} /> */}
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
                <ModalEditAnimal
                  type={"Ganado descarte"}
                  ganado={ganado_descarte}
                />
              )}

              <Details tittle={DetailsCattle.nombre} content={nombre} />
              <Details tittle={DetailsCattle.origen} content={origen} />
              <Details
                tittle={DetailsCattle.fecha_nacimiento}
                content={fecha_nacimiento}
              />
              {ganado_descarte.fallecimiento && (
                <>
                  <Details
                    tittle={DetailsCattle.fecha_fallecimiento}
                    content={ganado_descarte.fallecimiento.fecha}
                  />
                  <Details
                    tittle={DetailsCattle.causa_fallecimiento}
                    content={ganado_descarte.fallecimiento.causa}
                  />
                  <Details
                    tittle={DetailsCattle.descripcion_fallecimiento}
                    content={ganado_descarte.fallecimiento.descripcion}
                  />
                </>
              )}
              {ganado_descarte.venta && (
                <>
                  <Details
                    tittle={DetailsCattle.fecha_venta}
                    content={ganado_descarte.venta.fecha}
                  />
                  <Details
                    tittle={DetailsCattle.comprador}
                    content={ganado_descarte.venta.comprador}
                  />
                </>
              )}

              {ganado_descarte.fecha_ingreso && (
                <Details
                  tittle={DetailsCattle.fecha_ingreso}
                  content={ganado_descarte.fecha_ingreso}
                />
              )}
              <Details tittle={DetailsCattle.tipo} content={tipo} />
              <Details tittle={DetailsCattle.sexo} content={sexo} />
              <div className="flex flex-col items-center">
                <h3 className="font-bold text-lg">Estados</h3>
                <DropdownStatesCattle estados={estados} />
              </div>
              {/* Pesos */}
              <div className="flex flex-col gap-1 col-span-full m-auto sm:m-0 lg:m-0 lg:justify-self-stretch">
                {pesos ? (
                  <WeightsEditable
                    typeCattle={tipo}
                    disableEdit={disableEditWeight}
                    id={ganado_descarte.id}
                    pesos={pesos}
                    typeModelWeight={"descarte"}
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
        {sexo == "M" ? (
          <div className="w-full divide-y divide-primary/[.20]">
            <TabDetailsCattle vacunaciones={vacunaciones} isMale={true} />
          </div>
        ) : (
          <div className="w-full divide-y divide-primary/[.20]">
            <TabDetailsCattle
              revision_reciente={responseHembra.revision_reciente}
              servicio_reciente={responseHembra.servicio_reciente}
              total_revisiones={responseHembra.total_revisiones}
              total_servicios={responseHembra.total_servicios}
              efectividad={responseHembra.efectividad}
              parto_reciente={responseHembra.parto_reciente}
              total_partos={responseHembra.total_partos}
              info_pesajes_leche={responseHembra.info_pesajes_leche}
              vacunaciones={vacunaciones}
              disabledSomeTabs={false}
              isMale={false}
              disableCreateButton
              ganado_id={ganado_id}
            />
          </div>
        )}
      </div>
    </>
  );
}
