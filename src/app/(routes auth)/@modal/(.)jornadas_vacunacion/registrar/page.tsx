import { CreateVaccinationDay } from '@/components/create item in modal/create vaccination day';
import { ResponseVacunasDisponibles } from '@/types';
import { getData } from '@/utils/getData';

export default async function Page() {
    const { vacunas_disponibles }: ResponseVacunasDisponibles =
        await getData('vacunasDisponibles');
    return <CreateVaccinationDay vacunas_disponibles={vacunas_disponibles} />;
}
