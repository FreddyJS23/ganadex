'use serve';

import { ResponseCorrect, ResponseError, ResponseVeterinarioUsuario  } from '@/types';
import { getData } from '@/utils/getData';

export async function createUserVeterinary(
    id: number,
): Promise<string  | ResponseError | undefined> {
    try {
        const { usuario_veterinario }: ResponseVeterinarioUsuario = await getData(
            'usuariosVeterinarios',
            'POST',
            {'personal_id':id},
        );
        if (usuario_veterinario) return usuario_veterinario;
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}

export async function deleteUserVeterinary(
    id: number,
): Promise<boolean  | ResponseError | undefined> {
    try {
      await getData(
            'usuarioVeterinario',
            'DELETE',
            undefined,
            id,
        );
     
        return true
    } catch (error) {
        const { message } = error as Error;
        throw message;
    }
}

