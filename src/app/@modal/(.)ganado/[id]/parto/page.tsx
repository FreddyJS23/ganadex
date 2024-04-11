import { ModalHistoryBirths } from '@/components/modals/historys/history births';
import { ResponsePartos } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
    const { partos }: ResponsePartos = await getData('ganado', params.id, 'partos');

    return <ModalHistoryBirths partos={partos} />;
}
