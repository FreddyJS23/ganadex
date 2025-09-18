import { auth } from "@/app/auth";
import { FormCreateService } from "@/components/forms/create serve";
import {
  ResponseGanado,
  ResponsePajuelaToros,
  ResponseToros,
  ResponseVeterinariosSelect,
} from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";
import { Session } from "next-auth";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const { ganado }: ResponseGanado = await submitForm(
    "ganado",
    "GET",
    undefined,
    params.id,
  );
  const { veterinarios }: ResponseVeterinariosSelect = await submitForm(
    "veterinariosHaciendaActual",
  );
  const { toros }: ResponseToros = await submitForm("todosToro", "GET", undefined);
  const { pajuela_toros }: ResponsePajuelaToros = await submitForm(
    "pajuelaToro",
    "GET",
    undefined,
  );

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
