'use serve';

import { ResponseError, ResponseVeterinarioUsuario, UserVeterinary  } from '@/types';
import { getData } from '@/utils/getData';

export async function createUserVeterinary(
    id: number,
): Promise<string | UserVeterinary | ResponseError | undefined> {
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
