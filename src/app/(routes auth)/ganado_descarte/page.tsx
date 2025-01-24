import { auth } from '@/app/auth';
import { TableDiscardedCattle } from '@/components/tables/discarded cattle';
import { ResponseGanadoDescartes } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';
import { Session } from 'next-auth';

export default async function Page() {
    const { ganado_descartes }: ResponseGanadoDescartes = await getData(
        'todosGanadoDescarte',
    );
    const session = await auth() as Session
    const role=session.user.rol
    return (
        <>
            <TitlePage title="Reses" />
            <TableDiscardedCattle ganado_descartes={ganado_descartes} role={role} />
        </>
    );
}
