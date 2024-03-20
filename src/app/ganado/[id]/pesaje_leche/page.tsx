import { ModalHistoryWeightMilk } from '@/components/modals/history weight milk';
import { ResponsePesajesLeche, ResponseRevisiones } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
    const { pesajes_leche }: ResponsePesajesLeche = await getData(
        'response_pesajesLeche',
    );

    return <ModalHistoryWeightMilk pesajes_leche={pesajes_leche} />;
}
