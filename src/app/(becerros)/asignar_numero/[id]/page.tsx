import { ModalAssignmentNumberBullCalf } from '@/components/modals/assignment number bull calf';
import { ResponseGanado } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
    const { ganado }: ResponseGanado = await getData(
        'ganado',
        params.id,
    );
    const { numero, nombre } = ganado;

    return (
        <ModalAssignmentNumberBullCalf dataHeader={numero ? numero : nombre} />
    );
}
