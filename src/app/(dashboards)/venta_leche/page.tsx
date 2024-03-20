import { CardDashboardSaleMilk } from '@/components/cards';
import { ChartEarningsMilkMonth } from '@/components/charts/dashboard/earnings milk month';
import { CreateSaleMilk } from '@/components/create item in modal/create sale milk';
import { TableSaleMilk } from '@/components/tables/sale milk';
import { ResponsePreciosLeche, ResponseVentasLeche } from '@/types';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { ventas_de_leche }: ResponseVentasLeche = await getData(
        'response_ventasLeche',
    );
    const { precios }: ResponsePreciosLeche = await getData(
        'response_preciosLeche',
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
                <article className="w-full shadow-cards p-4 flex flex-col bg-base-100">
                    {/* titulo */}
                    <div className="flex justify-between">
                        <span className="text-2xl">
                            Ganancia acumulada del mes actual
                        </span>
                        {/* boton y modal crear venta leche */}
                        <ButtonCreateItem href={'venta_leche/registrar'} />
                    </div>
                    {/* Ganancias */}
                    <span className="mb-1 text-lg">39832</span>
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
