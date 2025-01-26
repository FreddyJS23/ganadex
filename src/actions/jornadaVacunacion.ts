'use serve';

import { DayVaccination, ResponseError,ResponseJornadaVacunacion } from '@/types';
import {  CreateVaccinacionDay } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createVaccinationDay(
    formData: CreateVaccinacionDay,
): Promise<DayVaccination | ResponseError | undefined> {
    try {
        const { jornada_vacunacion }: ResponseJornadaVacunacion = await getData(
            'jornadasVacunacion',
            'POST',
            formData,
        );
        return jornada_vacunacion;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
