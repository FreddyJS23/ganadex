import { auth } from "@/app/auth";
import { FormCreateCheckUp } from "@/components/forms/create chekUp";
import {
  ResponseGanado,
  ResponseTiposRevision,
  ResponseToros,
  ResponseVacunasDisponibles,
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
  
  const response3 = await getData<ResponseToros>({endPoint:"todosToro",param:"ganado_id",id:params.id});
  const {toros}=responseErrorServer(response3);   

  const response4 = await getData<ResponseTiposRevision>({endPoint:"tiposRevision"});
  const {tipos_revision}=responseErrorServer(response4);  

  const response5 = await getData<ResponseVacunasDisponibles>({endPoint:"vacunasDisponibles"});
  const {vacunas_disponibles}=responseErrorServer(response5);




  const { user } = (await auth()) as Session;
  return (
    <>
      <TitlePage title={`Registrar revisión para la vaca ${ganado.numero}`} />
      <FormCreateCheckUp
        veterinarios={veterinarios}
        typesCheck={tipos_revision}
        isAdmin={user.rol == "admin" ? true : false}
        listaVacunas={vacunas_disponibles}
        toros={toros}
      />
    </>
  );
}
