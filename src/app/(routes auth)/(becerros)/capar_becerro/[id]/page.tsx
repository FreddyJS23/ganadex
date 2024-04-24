import { ModalCastrateBullCalf } from '@/components/modals/castrate bull calf';
import { ResponseGanado } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
    const { ganado }: ResponseGanado = await getData(
        'ganado',
        'GET',
        params.id,
    );
    const { numero, nombre } = ganado;

    return <ModalCastrateBullCalf dataHeader={numero ? numero : nombre} />;
}
