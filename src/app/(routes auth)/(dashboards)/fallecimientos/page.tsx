import { ResponseFallecimientos } from "@/types";
import { Fallecimientos } from "@/types/dashboard";
import { getData } from "@/utils/getData";
import { TortaCausasFallecimientosGanado } from "@/components/charts/dashboard/common cause dead doughnut";
import { TableDeadCattle } from "@/components/tables/death cattle";
import { DropdownCausaFallecimiento } from "@/components/dropdown causa fallecimiento";

export default async function Page() {
  const { fallecidos }: ResponseFallecimientos =
    await getData("fallecimientos");

  const { causas_frecuentes, total_fallecidos }: Fallecimientos = await getData(
    "dashboardFallecimientosCausasFrecuentes",
  );

  return (
    <section className="flex gap-8 flex-col">
      <div className="flex gap-6 flex-col lg:flex-row w-full">
        {/*   grafico ganancia */}
        <article className="shadow-cards p-4 flex flex-col bg-base-100 max-h-72">
          {/* titulo */}
          <div className="flex justify-between gap-4">
            <span className="text-xl font-bold ">
              Causas mas frecuentes de fallecimientos
            </span>
            <DropdownCausaFallecimiento />
          </div>
          {/* grafico */}
          <TortaCausasFallecimientosGanado
            causas_frecuentes={causas_frecuentes}
            total_fallecidos={total_fallecidos}
          />
        </article>

        {/* tabla fallecimientos */}
        <article className="flex flex-col gap-2 grow">
          <h3 className="ml-2 text-lg md:text-xl font-bold">
            Historial de fallecimientos
          </h3>
          <TableDeadCattle fallecidos={fallecidos} />
        </article>
      </div>
    </section>
  );
}
