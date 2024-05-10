import { CardDashboardSaleMilk } from '@/components/cards';
import { ChartEarningsMilkMonth } from '@/components/charts/dashboard/earnings milk month';
import { TableSaleMilk } from '@/components/tables/sale milk';
import { ResponseVentasLeche } from '@/types';
import { GanaciasMes, PrecioActual, VariacionPrecio } from '@/types/dashboard';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import { getData } from '@/utils/getData';
import IconImprimir from '@/icons/icono-imprimir.svg';
import Link from 'next/link';

export default async function Page() {
    const { ventas_de_leche }: ResponseVentasLeche = await getData(
        'ventasLeche',
    );
    const { precio_actual }: PrecioActual = await getData(
        'dashboardVentaLecheprecioActual',
    );
    const { variacion }: VariacionPrecio = await getData(
        'dashboardVentaLechevariacionPRecio',
    );
    const { ganancias }: GanaciasMes = await getData(
        'dashboardVentaLechegananciasDelMes',
    );

    return (
        <section className="flex p-4  gap-8 flex-col sm:pl-12">
            {/* cards */}
            <article className="flex">
                <CardDashboardSaleMilk
                    title="Precio actual"
                    value={precio_actual}
                    variationValue={Math.round(variacion)}
                    multipleOption={true}
                />
            </article>
            <div className="flex gap-6 flex-col lg:flex-row w-full">
                {/*   grafico ganancia */}
                <article className="w-full shadow-cards p-4 flex flex-col bg-base-100">
                    {/* titulo */}
                    <div className="flex justify-between">
                        <span className="text-2xl">
                            Ganancia acumulada del mes actual
                        </span>
                        <Link
                            href={`/reporte/venta_leche`}
                        >
                            <IconImprimir className={'size-8'} />
                        </Link>
                    
                    </div>
                    {/* Ganancias */}
                    <span className="mb-1 text-lg">{ganancias}</span>
                    {/* grafico */}
                    <ChartEarningsMilkMonth />
                </article>

                {/* tabla ventas */}
                <article className="flex flex-col gap-2">
                    <h3 className="ml-2 text-lg md:text-xl">
                        Historial de ventas
                    </h3>
                    <TableSaleMilk ventas_de_leche={ventas_de_leche} />
                </article>
            </div>
        </section>
    );
}
