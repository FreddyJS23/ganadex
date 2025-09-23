import { auth } from "@/app/auth";
import { TabsProfile } from "@/components/tabs/tabs profile";
import type {
  ResponseHacienda,
  ResponseHaciendas,
  ResponseInformacionUsuarioLogeado,
  ResponseLogEventos,
  ResponsePreguntasSeguridad,
  ResponseRespuestaSeguridad,
  ResponseVeterinariosSinUsuario,
  ResponseVeterinariosUsuario,
} from "@/types";
import { getData } from "@/services/apiClient";
import type { Session } from "next-auth";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseVeterinariosUsuario>({
    endPoint: "usuariosVeterinarios",
  });
  const { usuarios_veterinarios } = responseErrorServer(response);

  const response2 = await getData<ResponseVeterinariosSinUsuario>({
    endPoint: "veterinariosSinUsuario",
  });
  const { veterinarios_sin_usuario } = responseErrorServer(response2);

  const response3 = await getData<ResponseHacienda>({
    endPoint: "verSesionHacienda",
  });
  const { hacienda } = responseErrorServer(response3);

  const response4 = await getData<ResponseHaciendas>({ endPoint: "hacienda" });
  const { haciendas } = responseErrorServer(response4);

  const response5 = await getData<ResponseLogEventos>({
    endPoint: "logsEventos",
  });
  const { logs_eventos } = responseErrorServer(response5);

  const response6 = await getData<ResponsePreguntasSeguridad>({
    endPoint: "preguntasSeguridadDisponibles",
  });
  const { preguntas_seguridad } = responseErrorServer(response6);

  const response7 = await getData<ResponseRespuestaSeguridad>({
    endPoint: "respuestasSeguridad",
  });
  const { respuestas_seguridad } = responseErrorServer(response7);

  const session = (await auth()) as Session;

  const id = session.user.userId;

  const response8 = await getData<ResponseInformacionUsuarioLogeado>({
    endPoint: "usuario",
    id: id,
  });
  const { user } = responseErrorServer(response8);

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
