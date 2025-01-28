import { CreateFinca } from '@/components/create item in modal/create finca';
import { ModalSelectFincaSesion } from '@/components/modals/select finca sesion';
import { ResponseFincas } from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { fincas }: ResponseFincas = await getData('finca');

    return fincas.length == 0 ? (
        <CreateFinca primeraFinca={true} />
    ) : (
        <ModalSelectFincaSesion fincas={fincas} />
    );
}
