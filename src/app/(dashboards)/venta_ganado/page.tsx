import { CardDashboardSaleCattle } from '@/components/cards';
import { SalesCatle } from '@/components/charts/dashboard/sales catle';
import { CreateSaleCattle } from '@/components/create item in modal/create sale cattle';
import { TableSaleCasttle } from '@/components/tables/sale casttle';
import { ResponseCompradores, ResponseVentasGanado } from '@/types';
import { ButtonCreateItem } from '@/ui/ButtonCreate';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { ventas }: ResponseVentasGanado = await getData(
        'response_ventasGanado',
    );

    return (
        <section className="flex p-4  gap-8 flex-col sm:pl-12">
            {/* cards */}
            <article className="flex justify-around flex-wrap gap-4 items-center">
                <CardDashboardSaleCattle
                    data={'Sebastian'}
                    title="Mejor comprador"
                />
                <CardDashboardSaleCattle data={999} title="Mejor venta" />
                <CardDashboardSaleCattle data={999} title="Peor venta" />
            </article>

            {/*   grafico venta */}
            <article className="w-full shadow-cards bg-base-100 p-4 flex flex-col gap-4">
                {/* titulo */}
                <div className="flex justify-between">
                    <span className="text-2xl">
                        Ganancia acumulada del mes actual
                    </span>
                    {/* boton y modal crear venta */}
                    <ButtonCreateItem href={'venta_ganado/registrar'} />
                </div>
                {/* grafico */}
                <SalesCatle />
            </article>

            {/* tabla ventas */}
            <article className="flex flex-col gap-2">
                <h3 className="ml-2 text-lg md:text-xl">Historial de ventas</h3>
                <TableSaleCasttle ventas={ventas} />
            </article>
        </section>
    );
}
