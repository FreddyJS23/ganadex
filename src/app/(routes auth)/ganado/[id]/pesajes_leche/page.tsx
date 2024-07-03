import { ModalHistoryWeightMilk } from '@/components/modals/historys/history weight milk';
import { ResponsePesajesLeche } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
    const { pesajes_leche }: ResponsePesajesLeche = await getData(
        'ganado',
        'GET',
        undefined,
        params.id,
        'pesajesLeche',
    );

    return <ModalHistoryWeightMilk pesajes_leche={pesajes_leche} />;
}
