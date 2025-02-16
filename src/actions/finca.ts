'use serve';

import {  ResponseErrorNext, ResponseFinca } from '@/types';
import {  CreateFinca } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createFinca(
    formData: CreateFinca,
): Promise<string | ResponseErrorNext > {
   
        const response = await getData<CreateFinca,ResponseFinca>(
            'finca',
            'POST',
            formData,
        );
      if('error' in response) return response
      else return response.finca.nombre
}

export async function createSesionFinca(
    fincaId: number,
): Promise<string  | ResponseErrorNext | undefined> {
 
        const response = await getData<number,ResponseFinca>(
            'crearSesionFinca',
            'GET',
            undefined,
            fincaId,
        );
        
        if('error' in response) return response
        else return response.finca.nombre
}

