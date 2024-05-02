import { FormCreateBirth } from '@/components/forms/create birth';
import { ResponseGanado, ResponseVeterinariosSelect } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

type ParamsPage = {
    params: { id: number };
};

export default async function Page({params}:ParamsPage) {
    const { ganado }: ResponseGanado = await getData(
        'ganado',
        'GET',
        undefined,
        params.id,
    );

    const { veterinarios }: ResponseVeterinariosSelect = await getData(
        'veterinariosDisponibles',
    );
    return (
        <>
            <TitlePage title={`Registrar parto para la vaca ${ganado.numero}`} />

       <FormCreateBirth veterinarios={veterinarios} />
        </>
    );
}
