import { FormCreateBirth } from '@/components/forms/create birth';
import { ResponseGanado, ResponseSugerirNumero, ResponseVeterinariosSelect } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
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

    const { veterinarios }: ResponseVeterinariosSelect = await getData(
        'veterinariosDisponibles',
    );
    const { numero_disponible }: ResponseSugerirNumero = await getData('sugerirNumero');

    return (
        <>
            <TitlePage
                title={`Registrar parto para la vaca ${ganado.numero}`}
            />

            <FormCreateBirth numero_disponible={numero_disponible} veterinarios={veterinarios} />
        </>
    );
}
