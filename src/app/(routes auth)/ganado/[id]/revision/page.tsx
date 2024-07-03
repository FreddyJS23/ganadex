import { ModalHistoryCheckUps } from '@/components/modals/historys/history checkups';
import { ResponseRevisiones } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
    const { revisiones }: ResponseRevisiones = await getData(
        'ganado',
        'GET',
        undefined,
        params.id,
        'revisiones',
    );

    return <ModalHistoryCheckUps revisiones={revisiones} />;
}
