import { CardDashboardSaleMilk } from '@/components/cards';
import { TableSaleMilk } from '@/components/tables/sale milk';
import { ResponseVentasLeche } from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { ventas_de_leche }: ResponseVentasLeche = await getData(
        'response_ventasLeche',
    );

    return (
        <section className="flex p-4  gap-8 flex-col sm:pl-12">
            {/* cards */}
            <article className="flex">
                <CardDashboardSaleMilk
                    title="Precio actual"
                    value={93}
                    variationValue={0.34}
                />
            </article>
            <div className="flex gap-6 flex-col lg:flex-row w-full">
                {/*   grafico ganancia */}
                <article className="w-full shadow-cards p-4 flex flex-col">
                    {/* titulo */}
                    <div className="flex justify-between">
                        <span>Ganancias del mes actual</span>
                        <span className="size-7">+</span>
                    </div>
                    {/* Ganancias */}
                    <span className="mb-1">39832</span>
                    {/* grafico */}
                    <div className="">grafico</div>
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
