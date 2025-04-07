import { CardDashboard } from "@/components/cards";
import { TortaTipoGanado } from "@/components/charts/dashboard/types catle doughnut";
import {
  /* InsumoMayorExistencia,
    InsumoMenorExistencia, */
  ResponseTotalTiposGanado,
  TopVacasMenosProductoras,
  TopVacasProductoras,
  TotalGanadoPendienteRevision,
  TotalGanadoPendienteservir,
  TotalPersonal,
  TotalVacasEnGestacion,
  TotalVacasEnOrdeño,
  balanceAnualLeche,
} from "@/types/dashboard";
import { getData } from "@/utils/getData";
import IconCatle from "@/icons/icono-ganado.svg";
import IconPositive from "@/icons/icono-ganancia.svg";
import IconNegative from "@/icons/icono-perdida.svg";
import IconSupplies from "@/icons/icono-insumo.svg";
import { ProduccionVacasTop3 } from "@/components/charts/dashboard/top catle production bar";
/* import { CircularProgress } from '@/components/circules progress dashboard'; */
import { ChartAnnualBalanceMilk } from "@/components/charts/dashboard/annual balance milk";
import { ResponseAñosProduccionLeche, ResponsePlanesSanitario } from "@/types";
import { Tooltip } from "@/components/tooltip";
import { WarningToast } from "@/components/warning toast";
import { auth } from "@/app/auth";
import { Session } from "next-auth";

export default async function Home() {
  const { total_tipos_ganado }: ResponseTotalTiposGanado = await getData(
    "dashboardPrincipaltotalGanadoTipo",
  );
  const { top_vacas_productoras }: TopVacasProductoras = await getData(
    "dashboardPrincipalvacasProductoras",
  );
  const { top_vacas_menos_productoras }: TopVacasMenosProductoras =
    await getData("dashboardPrincipalvacasMenosProductoras");
  /*  const { mayor_cantidad_insumo }: InsumoMayorExistencia = await getData(
        'dashboardPrincipalinsumoMayorExistencia',
    );
    const { menor_cantidad_insumo }: InsumoMenorExistencia = await getData(
        'dashboardPrincipalinsumoMenorExistencia',
    ); */
  const { balance_anual }: balanceAnualLeche = await getData(
    "dashboardPrincipalbalanceAnualLeche",
  );
  const { ganado_pendiente_revision }: TotalGanadoPendienteRevision =
    await getData("dashboardPrincipalpendienteRevision");
  const { total_personal }: TotalPersonal = await getData(
    "dashboardPrincipaltotalPersonal",
  );
  const { vacas_en_gestacion }: TotalVacasEnGestacion = await getData(
    "dashboardPrincipalvacasGestacion",
  );

  const { total_vacas_en_ordeño }: TotalVacasEnOrdeño = await getData(
    "dashboardPrincipalVacasEnOrdeño",
  );

  const { cantidad_vacas_para_servir }: TotalGanadoPendienteservir =
    await getData("dashboardPrincipalcantidadNovillasMontar");

  const { años_produccion_leche }: ResponseAñosProduccionLeche = await getData(
    "añosProduccionLeche",
  );

  const { planes_sanitario }: ResponsePlanesSanitario = await getData(
    "planesSanitariosPendientes",
  );

  const existsPlanesSanitario = planes_sanitario.length > 0;
  const session = (await auth()) as Session;
  /* comprobar si el usuario tiene preguntas de seguridad */
  /* esto viene del backend y se guarda en la sesion de auth */
  const tiene_preguntas_seguridad = session.user.tiene_preguntas_seguridad;

  return (
    <section className="flex flex-col gap-8 justify-center items-center  m-auto sm:grid grid-cols-4 sm:gap-4 sm:gap-y-12  md:items-center">
      {/*  grafico torta */}
      <article className="p-4 bg-base-100 col-span-full max-w-xl md:col-span-2 lex justify-center flex-col  w-full shadow-cards">
        <div className="flex justify-between">
          <h3>Cabezas de ganado</h3>
          <IconCatle
            className={"size-8 bg-primary opacity-70 p-1 rounded-full"}
          />
        </div>

        <TortaTipoGanado total_tipos_ganado={total_tipos_ganado} />
      </article>
      {/* cards  */}
      <article className="col-span-full flex flex-wrap gap-8 w-full p-4  justify-center  sm:justify-around md:col-start-3 md:grid md:grid-cols-2 md:p-0 md:gap-4 md:justify-normal ">
        <CardDashboard
          data={vacas_en_gestacion}
          title="Vacas preñadas"
          icon="pregnant"
        />
        <CardDashboard
          data={cantidad_vacas_para_servir}
          title="Pendiente de servir"
          icon="serve"
        />
        <CardDashboard
          data={ganado_pendiente_revision}
          title="Pendiente de revision"
          icon="checkUp"
        />
        <CardDashboard data={total_personal} title="Personal" icon="staff" />
      </article>
      <div className="col-span-full flex flex-col justify-around sm:flex-row">
        {/*    grafico vacas productoras */}
        <article className="p-4 flex flex-col gap-2  bg-base-100 max-w-72 shadow-cards">
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <h2>Vacas productoras</h2>
              <Tooltip
                type="icon"
                content={"top_vacas_productoras"}
                placement="right"
                size="md"
              />
            </div>
            <IconPositive className={"size-8 "} />
          </div>
          <ProduccionVacasTop3 vacasProductoras={top_vacas_productoras} />
        </article>

        <article className="w-52 h-20 self-center">
          <CardDashboard
            data={total_vacas_en_ordeño}
            title="Vacas en ordeño"
            icon="pregnant"
          />
        </article>
        {/*    grafico vacas menos productoras */}
        <article className="p-4 flex flex-col gap-2  bg-base-100 max-w-72  shadow-cards">
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <h2>Vacas menos productoras</h2>
              <Tooltip
                type="icon"
                content={"top_vacas_menos_productoras"}
                placement="right"
                size="md"
              />
            </div>
            <IconNegative className={"size-8 "} />
          </div>
          <ProduccionVacasTop3 vacasProductoras={top_vacas_menos_productoras} />
        </article>

        {/* grafico insumos */}
        {/* <article className="p-4 flex flex-col bg-base-100 shadow-cards">
                    <div className="flex justify-between">
                        <h2>Insumos</h2>
                        <IconSupplies
                            className={
                                'size-8 bg-primary opacity-70 p-1 rounded-full'
                            }
                        />
                    </div>
                     <div className="flex">
                        <CircularProgress
                            value={
                                mayor_cantidad_insumo
                                    ? mayor_cantidad_insumo.cantidad
                                    : 0
                            }
                            positive={true}
                            label={
                                mayor_cantidad_insumo
                                    ? mayor_cantidad_insumo.insumo
                                    : ''
                            }
                            rangeMaxValue={
                                mayor_cantidad_insumo
                                    ? mayor_cantidad_insumo.cantidad
                                    : 0
                            }
                        />
                        <CircularProgress
                            value={
                                menor_cantidad_insumo
                                    ? menor_cantidad_insumo.cantidad
                                    : 0
                            }
                            positive={false}
                            label={
                                menor_cantidad_insumo
                                    ? menor_cantidad_insumo.insumo
                                    : ''
                            }
                            rangeMaxValue={
                                mayor_cantidad_insumo
                                    ? mayor_cantidad_insumo.cantidad
                                    : 0
                            }
                        />
                    </div> 
                </article> */}
      </div>
      {/* grafico produccion anual leche */}
      <article className="p-4 col-span-full shadow-cards flex flex-col gap-2 bg-base-100 ">
        <ChartAnnualBalanceMilk
          años_produccion_leche={años_produccion_leche}
          balanceAnual={balance_anual}
        >
          <div className=" flex items-center gap-1">
            <h2 className="text-2xl">Produccion anual de leche</h2>
            <Tooltip type="icon" content={"produccion_anual_leche"} size="md" />
          </div>
        </ChartAnnualBalanceMilk>
      </article>
      <WarningToast
        title="Planes sanitarios pendientes"
        description="Hay planes sanitarios que ya sobrepasaron su fecha de proxima dosis. 
            Por favor si ya se realizaron, 
            registre para tener los datos actualizados"
        warning={existsPlanesSanitario}
        type="plan_sanitario"
      />
      <WarningToast
        title="Preguntas de seguridad requeridas"
        description="Actualmente no tiene el mínimo de preguntas de seguridad,
            por favor vaya al perfil y rellénalas, tenga en cuenta que sin esto no podrá recuperar su contraseña"
        warning={!tiene_preguntas_seguridad}
        type="preguntas_seguridad"
      />
    </section>
  );
}
