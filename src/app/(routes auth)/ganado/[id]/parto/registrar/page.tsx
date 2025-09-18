import { auth } from "@/app/auth";
import { FormCreateBirth } from "@/components/forms/create birth";
import {
  ResponseGanado,
  ResponseObrerosSelect,
  ResponseSugerirNumero,
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
  
  const response = await getData<ResponseGanado>({endPoint:"ganado",id:params.id});
  const {ganado}=responseErrorServer(response);

  const response2 = await getData<ResponseVeterinariosSelect>({endPoint:"veterinariosHaciendaActual"});
  const {veterinarios}=responseErrorServer(response2);
  
  
  const response3 = await getData<ResponseObrerosSelect>({endPoint:"obreros"});
  const {obreros}=responseErrorServer(response3);

    const response4 = await getData<ResponseSugerirNumero>({endPoint:"sugerirNumero"});
  const {numero_disponible}=responseErrorServer(response4);
    



  const { user } = (await auth()) as Session;
  return (
    <>
      <TitlePage title={`Registrar parto para la vaca ${ganado.numero}`} />

      <FormCreateBirth
        isAdmin={user.rol == "admin" ? true : false}
        numero_disponible={numero_disponible}
        veterinarios={veterinarios}
        obreros={obreros}
      />
    </>
  );
}
