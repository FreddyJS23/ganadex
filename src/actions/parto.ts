'use serve';

import { ResponseErrorNext } from '@/types';
import { CreateBirth } from '@/types/forms';
import { getData } from '@/utils/getData';

export async function createBirth(
    formData: CreateBirth,
    id: number,
): Promise<void | ResponseErrorNext > {
    
        const response = await getData<CreateBirth,void>('ganado', 'POST', formData, id, 'parto');
        return response
    
}
