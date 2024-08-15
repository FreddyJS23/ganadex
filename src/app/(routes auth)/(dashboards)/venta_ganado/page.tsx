import { CardDashboardSaleCattle } from '@/components/cards';
import { SalesCatle } from '@/components/charts/dashboard/sales catle';
import { TableSaleCasttle } from '@/components/tables/sale casttle';
import { ResponseAñosVentaGanado, ResponseVentasGanado } from '@/types';
import {
    BalanceAnualVentaGanado,
    MejorComprador,
   /*  MejorVenta,
    PeorVenta, */
} from '@/types/dashboard';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { ventas }: ResponseVentasGanado = await getData('ventasGanado');
    const { comprador }: MejorComprador = await getData(
        'dashboardVentaGanadomejorComprador',
    );
   /*  const { venta: mejorVenta }: MejorVenta = await getData(
        'dashboardVentaGanadomejorVenta',
    );
    const { venta: peorVenta }: PeorVenta = await getData(
        'dashboardVentaGanadopeorVenta',
    ); */
    const { balance_anual }: BalanceAnualVentaGanado = await getData(
        'dashboardVentaGanadoBalanceAnual',
    );
    
    const { años_ventas_ganado }: ResponseAñosVentaGanado = await getData(
        'añosVentaGanado',
    );

    return (
        <section className="flex p-4  gap-8 flex-col sm:pl-12">
            {/* cards */}
            <article className="flex justify-around flex-wrap gap-4 items-center">
                <CardDashboardSaleCattle
                    data={comprador.nombre ?? ''}
                    title="Mejor comprador"
                    multipleOption
                />
              {/*   <CardDashboardSaleCattle
                    data={mejorVenta.precio ?? ''}
                    title="Mejor venta"
                />
                <CardDashboardSaleCattle
                    data={peorVenta.precio ?? ''}
                    title="Peor venta"
                /> */}
            </article>

            {/*   grafico venta */}
            <article className="w-full shadow-cards bg-base-100 p-4 flex flex-col gap-4">
                <SalesCatle balance_anual={balance_anual} años_ventas_ganado={años_ventas_ganado} />
            </article>

            {/* tabla ventas */}
            <article className="flex flex-col gap-2">
                <h3 className="ml-2 text-lg md:text-xl">Historial de ventas</h3>
                <TableSaleCasttle ventas={ventas} />
            </article>
        </section>
    );
}
