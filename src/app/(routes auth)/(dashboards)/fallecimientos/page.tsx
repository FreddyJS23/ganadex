import { ResponseFallecimientos } from '@/types';
import { Fallecimientos } from '@/types/dashboard';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import { getData } from '@/utils/getData';
import { TortaCausasFallecimientosGanado } from '@/components/charts/dashboard/common cause dead doughnut';
import { TableDeadCattle } from '@/components/tables/death cattle';
import { DropdownCausaFallecimiento } from '@/components/dropdown causa fallecimiento';

export default async function Page() {
    const { fallecidos }: ResponseFallecimientos =
        await getData('fallecimientos');

    const { causas_frecuentes, total_fallecidos }: Fallecimientos =
        await getData('dashboardFallecimientosCausasFrecuentes');

    return (
        <section className="flex p-4  gap-8 flex-col sm:pl-12">
            <div className="flex gap-6 flex-col lg:flex-row w-full">
                {/*   grafico ganancia */}
                <article className="shadow-cards p-4 flex flex-col bg-base-100">
                    {/* titulo */}
                    <div className="flex justify-between gap-4">
                        <span className="text-2xl">
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
                    <h3 className="ml-2 text-lg md:text-xl">
                        Historial de fallecimientos
                    </h3>
                    <TableDeadCattle fallecidos={fallecidos} />
                </article>
            </div>
        </section>
    );
}
