import { ModalHistoryCheckUps } from '@/components/modals/history checkups';
import { ResponseRevisiones } from '@/types';
import { getData } from '@/utils/getData';


export default async function Page() {
    const { revisioness }: ResponseRevisiones = await getData(
        'ganado',
        2,
        'revisiones'
    );

    return <ModalHistoryCheckUps revisiones={revisioness} />;
}
