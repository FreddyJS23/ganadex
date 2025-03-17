import { auth } from '@/app/auth';
import { FormCreateBirth } from '@/components/forms/create birth';
import { ResponseGanado, ResponseObrerosSelect, ResponseSugerirNumero, ResponseVeterinariosSelect } from '@/types';
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
        'veterinariosHaciendaActual',
    );
    const { numero_disponible }: ResponseSugerirNumero = await getData('sugerirNumero');

    const{user}=await auth() as Session
    return (
        <>
            <TitlePage
                title={`Registrar parto para la vaca ${ganado.numero}`}
            />

            <FormCreateBirth isAdmin={user.rol == 'admin' ? true : false} numero_disponible={numero_disponible} veterinarios={veterinarios} />
        </>
    );
}
