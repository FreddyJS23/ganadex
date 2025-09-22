import { auth } from "@/app/auth";
import { FormCreateService } from "@/components/forms/create serve";
import {
  ResponseGanado,
  ResponsePajuelaToros,
  ResponseToros,
  ResponseVeterinariosSelect,
} from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";
import { Session } from "next-auth";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponseGanado>({
    endPoint: "ganado",
    id: params.id,
  });
  const { ganado } = responseErrorServer(response);

  const response2 = await getData<ResponseVeterinariosSelect>({
    endPoint: "veterinariosHaciendaActual",
  });
  const { veterinarios } = responseErrorServer(response2);

  const response3 = await getData<ResponseToros>({
    endPoint: "todosToro",
    param: "ganado_id",
    id: params.id,
  });
  const { toros } = responseErrorServer(response3);

  const response4 = await getData<ResponsePajuelaToros>({
    endPoint: "pajuelaToro",
  });
  const { pajuela_toros } = responseErrorServer(response4);

  const { user } = (await auth()) as Session;

  return (
    <>
      <TitlePage title={`Registrar servicio para la vaca ${ganado.numero}`} />
      <FormCreateService
        isAdmin={user.rol == "admin" ? true : false}
        veterinarios={veterinarios}
        toros={toros}
        pajuelasToro={pajuela_toros}
      />
    </>
  );
}
