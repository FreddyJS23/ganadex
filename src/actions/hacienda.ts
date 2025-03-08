'use serve';

import {  ResponseErrorNext, ResponseHacienda } from '@/types';
import {  CreateHacienda } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createHacienda(
    formData: CreateHacienda,
): Promise<string | ResponseErrorNext > {
   
        const response = await getData<CreateHacienda,ResponseHacienda>(
            'hacienda',
            'POST',
            formData,
        );
      if('error' in response) return response
      else return response.hacienda.nombre
}

export async function createSesionHacienda(
    haciendaId: number,
): Promise<string  | ResponseErrorNext | undefined> {
 
        const response = await getData<number,ResponseHacienda>(
            'crearSesionHacienda',
            'GET',
            undefined,
            haciendaId,
        );
        
        if('error' in response) return response
        else return response.hacienda.nombre
}

