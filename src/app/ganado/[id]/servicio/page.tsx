import { ModalHistoryServices } from '@/components/modals/historys/history services';
import { ResponseServicios } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
    const { servicios }: ResponseServicios = await getData(
        'ganado',
        params.id,
        'servicios',
    );

    return <ModalHistoryServices servicios={servicios} />;
}
