import { TableAllCheckups } from '@/components/tables/checkups';
import { ResponseRevisionesGeneral } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { todas_revisiones }: ResponseRevisionesGeneral =
        await getData('revisiones');
    return (
        <section>
            <TitlePage title="Revisiones generales" />
            <TableAllCheckups todas_revisiones={todas_revisiones} />
        </section>
    );
}
