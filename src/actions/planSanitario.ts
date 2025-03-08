'use serve';

import { DayVaccination,ResponseErrorNext,ResponsePlanSanitario } from '@/types';
import {  CreateVaccinacionDay } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createVaccinationDay(
    formData: CreateVaccinacionDay,
): Promise<DayVaccination | ResponseErrorNext> {
  
        const response= await getData<CreateVaccinacionDay,ResponsePlanSanitario>(
            'planesSanitario',
            'POST',
            formData,
        );
        if('error' in response) return response
        else return response.plan_sanitario
   
}
