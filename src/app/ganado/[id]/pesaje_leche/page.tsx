import { ModalHistoryWeightMilk } from '@/components/modals/history weight milk';
import { ResponsePesajesLeche,} from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { pesajes_leche }: ResponsePesajesLeche = await getData(
        'ganado',
        2,
        'pesajesLeche'
    );

    return <ModalHistoryWeightMilk pesajes_leche={pesajes_leche} />;
}
