import { ModalBirth } from '@/components/modals/birth';
import { ResponseParto } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number; id2: number };
};

export default async function Page({ params }: ParamsPage) {
    const { parto }: ResponseParto = await getData(
        'ganado',
        params.id,
        'parto',
        params.id2
    );

    return <ModalBirth parto={parto} />;
}
