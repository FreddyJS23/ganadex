import { TableBeef } from '@/components/tables/beef';
import { ResponseReses,  } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { reses }: ResponseReses =
        await getData('todosReses');
    return (
        <>
            <TitlePage title="Reses" />
            <TableBeef reses={reses} />
        </>
    );
}
