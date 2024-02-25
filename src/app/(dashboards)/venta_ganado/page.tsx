import { CardDashboardSaleMilk } from '@/components/cards';
import { TableSaleCasttle } from '@/components/tables/sale casttle';
import { ResponseVentasGanado } from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
 const { ventas }: ResponseVentasGanado =
        await getData('response_ventasGanado');

    return (
        <section className="flex p-4  gap-8 flex-col">
            {/* cards */}
            <article className="flex justify-around">
                <CardDashboardSaleMilk
                    data={'Sebastian'}
                    title="Mejor comprador"
                />
                <CardDashboardSaleMilk data={999} title="Mejor venta" />
                <CardDashboardSaleMilk data={999} title="Peor venta" />
            </article>

            {/*   grafico venta */}
            <article className="w-full shadow-cards p-4 flex flex-col gap-4">
                {/* titulo */}
                <div className="flex justify-between">
                    <span>Ventas mensuales</span>
                    <span className="size-7">+</span>
                </div>
                {/* grafico */}
                <div className="">grafico</div>
            </article>

            {/* tabla ventas */}
            <article className='flex flex-col gap-4'>
                <h3 className='ml-4 text-xl'>Historial de ventas</h3>
                <TableSaleCasttle ventas={ventas} />
            </article>
        </section>
    );
}
