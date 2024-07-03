import { TableBull } from '@/components/tables/bull';
import { ResponseToros } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { toros }: ResponseToros = await getData('todosToro');
    return (
        <>
            <TitlePage title="Toros" />
            <TableBull toros={toros} />
        </>
    );
}
