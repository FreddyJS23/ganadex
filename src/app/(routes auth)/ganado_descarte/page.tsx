import { TableDiscardedCattle } from '@/components/tables/discarded cattle';
import { ResponseGanadoDescartes } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { ganado_descartes }: ResponseGanadoDescartes = await getData(
        'todosGanadoDescarte',
    );
    return (
        <>
            <TitlePage title="Reses" />
            <TableDiscardedCattle ganado_descartes={ganado_descartes} />
        </>
    );
}
