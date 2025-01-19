import { FormCreateService } from '@/components/forms/create serve';
import { ResponseGanado, ResponsePajuelaToros, ResponseToros, ResponseVeterinariosSelect } from '@/types';
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
    const { toros }: ResponseToros = await getData('todosToro', 'GET', undefined);
    const { pajuela_toros }: ResponsePajuelaToros = await getData('pajuelaToro', 'GET', undefined);
    
    return (
        <>
            <TitlePage
                title={`Registrar servicio para la vaca ${ganado.numero}`}
            />
            <FormCreateService veterinarios={veterinarios} toros={toros} pajuelasToro={pajuela_toros} />
        </>
    );
}
