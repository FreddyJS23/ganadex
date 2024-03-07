import { CardDashboard } from '@/components/cards';
import { TortaTipoGanado } from '@/components/charts/dashboard';
import { ResponseTotalTiposGanado } from '@/types/dashboard';
import { getData } from '@/utils/getData';
import IconCatle from '@/icons/icono-ganado.svg'

export default async function Home() {
    
    const {total_tipos_ganado}:ResponseTotalTiposGanado =await getData('response_totalGanadoPorTipo');
    
     return (
        <section className="flex flex-col gap-8 justify-center items-center max-w-5xl m-auto sm:grid grid-cols-4 sm:gap-4 sm:gap-y-12 sm:p-4 sm:pl-8 md:items-center xl:pl-0">
            {/*  grafico torta */}
            <article className="p-4 bg-base-100 col-span-full max-w-xl md:col-span-2 lex justify-center flex-col  w-full shadow-cards">
                <div className="flex justify-between">
                    <h3>Cabezas de ganado</h3>
                    <IconCatle
                        className={'size-8 bg-primary opacity-70 p-1 rounded-full'}
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
                <article className="p-2 max-w-72 ">
                    <div className="w-full h-40 shadow-cards">
                        grafico vacas productoras
                    </div>
                </article>

                {/*    grafico vacas menos productoras */}
                <article className="p-2 max-w-72 ">
                    <div className="w-full h-40 shadow-cards">
                        grafico vacas menos productoras
                    </div>
                </article>

                {/* grafico insumos */}
                <article className="p-2 max-w-72 ">
                    <div className="w-full h-40 shadow-cards">
                        insumos
                    </div>
                </article>
            </div>
            {/* grafico produccion anual leche */}
            <article className="p-2 max-w-80 col-span-full sm:max-w-3xl md:m-auto   ">
                <div className="w-full h-40 shadow-cards">
                    produccion anual
                </div>
            </article>
        </section>
    );
}
