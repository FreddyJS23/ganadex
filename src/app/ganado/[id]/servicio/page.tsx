import { ModalHistoryServices } from '@/components/modals/history services';
import { ResponseServicios } from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { servicios }: ResponseServicios =
        await getData('ganado',3,'servicios')

    return <ModalHistoryServices servicios={servicios} />;
}
