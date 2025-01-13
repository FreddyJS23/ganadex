import { FormCow } from '@/components/forms/create cow';
import { ResponseCompradores, ResponseVacunasDisponibles } from '@/types';
import { TitlePage } from '@/ui/TitlePage';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { compradores }: ResponseCompradores = await getData('compradores');
    const { vacunas_disponibles }: ResponseVacunasDisponibles =
    await getData('vacunasDisponibles');
    
    return (
        <>
            <TitlePage title="Registrar vaca" />
            <FormCow listaVacunas={vacunas_disponibles} compradores={compradores} />
        </>
    );
}
