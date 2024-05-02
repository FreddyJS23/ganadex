import { TableCasttle } from '@/components/tables/casttle';
import { ResponseGanados } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { cabezas_ganado }: ResponseGanados =
        await getData('todosGanado');
    return (
        <>
            <TitlePage title="Cabezas de ganado" />
            <TableCasttle cabezas_ganado={cabezas_ganado} />
        </>
    );
}
