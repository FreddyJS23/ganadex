import { ModalHistoryCheckUps } from '@/components/modals/history checkups';
import { ModalHistoryServices } from '@/components/modals/history services';
import { ResponseRevisiones, ResponseServicios } from '@/types';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
    const { servicios }: ResponseServicios = await getData(
        'response_servicios',
    );

    return <ModalHistoryServices servicios={servicios} />;
}
