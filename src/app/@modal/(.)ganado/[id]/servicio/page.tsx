import { ModalHistoryServices } from '@/components/modals/history services';
import {  ResponseServicios } from '@/types';
import { getData } from '@/utils/getData';


export default async function Page() {
    const { servicios }: ResponseServicios =
        await getData('response_servicios');

    return <ModalHistoryServices servicios={servicios} />;
}
