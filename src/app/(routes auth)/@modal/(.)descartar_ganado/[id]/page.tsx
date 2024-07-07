import { ModalDiscardCattle } from '@/components/modals/discard cattle';
import { ResponseGanado } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
    const { ganado }: ResponseGanado = await getData(
        'ganado',
        'GET',
        undefined,
        params.id,
    );
    const { numero, nombre } = ganado;

    return <ModalDiscardCattle dataHeader={numero ? numero : nombre} />;
}
