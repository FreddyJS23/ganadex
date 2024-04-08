import { TableSupplies } from '@/components/tables/supplies';
import { ResponseInsumos } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { insumos }: ResponseInsumos = await getData('insumos');
    return (
        <section>
            <TitlePage title="Insumos" />
            <TableSupplies insumos={insumos} />
        </section>
    );
}
