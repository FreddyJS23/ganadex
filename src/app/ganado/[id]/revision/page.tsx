import { ModalHistoryCheckUps } from '@/components/modals/history checkups';
import { ResponseRevisiones } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
    const { revisioness }: ResponseRevisiones = await getData(
        'response_revisiones',
    );

    return <ModalHistoryCheckUps revisiones={revisioness} />;
}
