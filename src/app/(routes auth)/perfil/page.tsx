import { auth } from "@/app/auth";
import { TabsProfile } from "@/components/tabs profile";
import {
  ResponseHacienda,
  ResponseHaciendas,
  ResponseInformacionUsuarioLogeado,
  ResponseLogEventos,
  ResponsePreguntasSeguridad,
  ResponseRespuestaSeguridad,
  ResponseVeterinariosSinUsuario,
  ResponseVeterinariosUsuario,
} from "@/types";
import { submitForm } from "@/services/apiClient";
import { Session } from "next-auth";

export default async function Page() {
  const { usuarios_veterinarios }: ResponseVeterinariosUsuario = await submitForm(
    "usuariosVeterinarios",
  );
  const { veterinarios_sin_usuario }: ResponseVeterinariosSinUsuario =
    await submitForm("veterinariosSinUsuario");

  const { hacienda }: ResponseHacienda = await submitForm("verSesionHacienda");
  const { haciendas }: ResponseHaciendas = await submitForm("hacienda");

  const { logs_eventos }: ResponseLogEventos = await submitForm("logsEventos");

  const session = (await auth()) as Session;
  const id = session.user.userId;
  const { user }: ResponseInformacionUsuarioLogeado = await submitForm(
    "usuario",
    "GET",
    undefined,
    id,
  );

  const { preguntas_seguridad }: ResponsePreguntasSeguridad = await submitForm(
    "preguntasSeguridadDisponibles",
  );

  const { respuestas_seguridad }: ResponseRespuestaSeguridad = await submitForm(
    "respuestasSeguridad",
  );

  return (
    <>
      <section className="bg-base-100 items-center ">
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
