'use serve';

import { ListaVacunas, ResponseError, ResponseGanado } from '@/types';
import { CreateCastle } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createCastle(
    formData: CreateCastle,
    listVaccines: ListaVacunas[],
): Promise<string | number | ResponseError | undefined> {
    try {
      //en esta destructuracion se saca el id y se utiliza el resto del objecto
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const vacunas=listVaccines.map(({id,...rest})=>({...rest}))
    
    const { ganado }: ResponseGanado = await getData(
            'ganado',
            'POST',
        {...formData,vacunas},
        );  
        if (ganado.numero) return ganado.numero;
        else if (ganado.nombre) return ganado.nombre;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
