import { CardDashboard } from '@/components/cards';
import { TortaTipoGanado } from '@/components/charts/dashboard/types catle doughnut';
import {
    InsumoMayorExistencia,
    InsumoMenorExistencia,
    ResponseTotalTiposGanado,
    TopVacasMenosProductoras,
    TopVacasProductoras,
    balanceAnualLeche,
} from '@/types/dashboard';
import { getData } from '@/utils/getData';
import IconCatle from '@/icons/icono-ganado.svg';
import IconPositive from '@/icons/icono-ganancia.svg';
import IconNegative from '@/icons/icono-perdida.svg';
import IconSupplies from '@/icons/icono-insumo.svg';
import { ProduccionVacasTop3 } from '@/components/charts/dashboard/top catle production bar';
import { CircularProgress } from '@/components/circules progress dashboard';
import { ChartAnnualBalanceMilk } from '@/components/charts/dashboard/annual balance milk';

export default async function Home() {
    const { total_tipos_ganado }: ResponseTotalTiposGanado = await getData(
        'response_totalGanadoPorTipo',
    );
    const { top_vacas_productoras }: TopVacasProductoras = await getData(
        'response_vacasProductoras',
    );
    const { top_vacas_menos_productoras }: TopVacasMenosProductoras =
        await getData('response_vacasMenosProductoras');
    const { mayor_cantidad_insumo }: InsumoMayorExistencia = await getData(
        'response_insumoMayorExistencia',
    );
    const { menor_cantidad_insumo }: InsumoMenorExistencia = await getData(
        'response_insumoMenorExistencia',
    );
    const { balance_anual }: balanceAnualLeche = await getData(
        'response_balanceAnualLeche',
    );

    return (
        <section className="flex flex-col gap-8 justify-center items-center max-w-5xl m-auto sm:grid grid-cols-4 sm:gap-4 sm:gap-y-12 sm:p-4 sm:pl-8 md:items-center xl:pl-0">
            {/*  grafico torta */}
            <article className="p-4 bg-base-100 col-span-full max-w-xl md:col-span-2 lex justify-center flex-col  w-full shadow-cards">
                <div className="flex justify-between">
                    <h3>Cabezas de ganado</h3>
                    <IconCatle
                        className={
                            'size-8 bg-primary opacity-70 p-1 rounded-full'
                        }
                    />
                </div>

                <TortaTipoGanado total_tipos_ganado={total_tipos_ganado} />
            </article>
            {/* cards  */}
            <article className="col-span-full flex flex-wrap gap-8 w-full p-4  justify-center  sm:justify-around md:col-start-3 md:grid md:grid-cols-2 md:p-0 md:gap-4 md:justify-normal ">
                <CardDashboard
                    data={999}
                    title="Vacas preñadas"
                    icon="pregnant"
                />
                <CardDashboard
                    data={999}
                    title="Pendiente de servir"
                    icon="serve"
                />
                <CardDashboard
                    data={999}
                    title="Pendiente de revision"
                    icon="checkUp"
                />
                <CardDashboard data={999} title="Personal" icon="staff" />
            </article>
            <div className="col-span-full flex flex-col justify-around sm:flex-row">
                {/*    grafico vacas productoras */}
                <article className="p-4 flex flex-col gap-2  bg-base-100 max-w-72 shadow-cards">
                    <div className="flex justify-between">
                        <h2>Top vacas productoras</h2>
                        <IconPositive className={'size-8 '} />
                    </div>
                    <ProduccionVacasTop3
                        vacasProductoras={top_vacas_productoras}
                    />
                </article>

                {/*    grafico vacas menos productoras */}
                <article className="p-4 flex flex-col gap-2  bg-base-100 max-w-72  shadow-cards">
                    <div className="flex justify-between">
                        <h2>Top vacas menos productoras</h2>
                        <IconNegative className={'size-8 '} />
                    </div>
                    <ProduccionVacasTop3
                        vacasProductoras={top_vacas_menos_productoras}
                    />
                </article>

                {/* grafico insumos */}
                <article className="p-4 flex flex-col bg-base-100 shadow-cards">
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
                            value={mayor_cantidad_insumo.cantidad}
                            positive={true}
                            label={mayor_cantidad_insumo.insumo}
                            rangeMaxValue={mayor_cantidad_insumo.cantidad}
                        />
                        <CircularProgress
                            value={menor_cantidad_insumo.cantidad}
                            positive={false}
                            label={menor_cantidad_insumo.insumo}
                            rangeMaxValue={mayor_cantidad_insumo.cantidad}
                        />
                    </div>
                </article>
            </div>
            {/* grafico produccion anual leche */}
            <article className="p-4 col-span-full shadow-cards flex flex-col gap-2 bg-base-100 ">
                <div className="flex justify-between">
                    <h2 className="text-2xl">Produccion anual de leche</h2>
                </div>
                <ChartAnnualBalanceMilk balanceAnual={balance_anual} />
            </article>
        </section>
    );
}
