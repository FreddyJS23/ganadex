import { auth } from '@/app/auth';
import { TabsProfile } from '@/components/tabs profile';
import {
    ResponseInformacionUsuarioLogeado,
    ResponseVeterinariosSinUsuario,
    ResponseVeterinariosUsuario,
} from '@/types';
import { getData } from '@/utils/getData';
import { Session } from 'next-auth';

export default async function Page() {
    const { usuarios_veterinarios }: ResponseVeterinariosUsuario =
        await getData('usuariosVeterinarios');
    const { veterinarios_sin_usuario }: ResponseVeterinariosSinUsuario =
        await getData('veterinariosSinUsuario');
    const session = (await auth()) as Session;
    const id = session.user.userId;
    const { user }: ResponseInformacionUsuarioLogeado = await getData(
        'usuario',
        'GET',
        undefined,
        id,
    );
    const { finca } = session.user;

    return (
        <>
            <section className="bg-base-100 p-2 sm:ml-6 md:p-4 items-center xl:ml-0">
                <TabsProfile
                    finca={finca}
                    usuarios_veterinarios={usuarios_veterinarios}
                    veterinarios={veterinarios_sin_usuario}
                    user={user}
                />
            </section>
        </>
    );
}
