import { auth } from '@/app/auth';
import { FormCreateCheckUp } from '@/components/forms/create chekUp';
import { ResponseGanado, ResponseTiposRevision, ResponseVeterinariosSelect } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';
import { Session } from 'next-auth';
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

    const { veterinarios }: ResponseVeterinariosSelect = await getData(
        'veterinariosDisponibles',
    );

    const {tipos_revision}:ResponseTiposRevision = await getData('tiposRevision');

    const{user}=await auth() as Session

    return (
        <>
            <TitlePage
                title={`Registrar revision para la vaca ${ganado.numero}`}
            />
            <FormCreateCheckUp veterinarios={veterinarios} typesCheck={tipos_revision} isAdmin={user.rol == 'admin' ? true : false} />
        </>
    );
}
