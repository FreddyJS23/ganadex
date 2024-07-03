'use serve';

import { ResponseError, ResponseVentaGanado } from '@/types';
import { CreateSaleCattle } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createSaleCattle(
    formData: CreateSaleCattle,
    id: number,
): Promise<number | ResponseError | undefined> {
    try {
        const { venta }: ResponseVentaGanado = await getData(
            'ventaGanado',
            'POST',
            Object.assign(formData, { ganado_id: id }),
        );

        return venta.ganado.numero!;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}
