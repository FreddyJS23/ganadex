import { TableAllWeightMilk } from '@/components/tables/weight milk';
import { ResponsePesajesLecheGeneral } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { todos_pesaje_leche }: ResponsePesajesLecheGeneral =
        await getData('pesajesLeche');
    return (
        <section>
            <TitlePage title="Pesaje de leche generales" />
            <TableAllWeightMilk todos_pesaje_leche={todos_pesaje_leche} />
        </section>
    );
}
