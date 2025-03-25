import { auth } from '@/app/auth';
import { TabsProfile } from '@/components/tabs profile';
import {
    ResponseHacienda,
    ResponseHaciendas,
    ResponseInformacionUsuarioLogeado,
    ResponseLogEventos,
    ResponsePreguntasSeguridad,
    ResponseRespuestaSeguridad,
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
   
    const { hacienda }: ResponseHacienda = await getData('verSesionHacienda');
    const { haciendas }: ResponseHaciendas = await getData('hacienda');

    const {logs_eventos}:ResponseLogEventos= await getData('logsEventos');
   
        const session = (await auth()) as Session;
    const id = session.user.userId;
    const { user }: ResponseInformacionUsuarioLogeado = await getData(
        'usuario',
        'GET',
        undefined,
        id,
    );
    
    const {preguntas_seguridad}:ResponsePreguntasSeguridad= await getData('preguntasSeguridadDisponibles');
    
    const {respuestas_seguridad}:ResponseRespuestaSeguridad= await getData('respuestasSeguridad');
    

    
    return (
        <>
            <section className="bg-base-100 p-2 sm:ml-6 md:p-4 items-center xl:ml-0">
                <TabsProfile
                    haciendaSesion={hacienda}
                    haciendas={haciendas}
                    usuarios_veterinarios={usuarios_veterinarios}
                    veterinarios={veterinarios_sin_usuario}
                    user={user}
                    configuracion={user.configuracion}
                    logs_eventos={logs_eventos}
                    preguntas_seguridad={preguntas_seguridad}
                    respuestas_seguridad={respuestas_seguridad}
                />
            </section>
        </>
    );
}
