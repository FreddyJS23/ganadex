import { auth } from "@/app/auth";
import { FormCreateBirth } from "@/components/forms/create birth";
import {
  ResponseGanado,
  ResponseObrerosSelect,
  ResponseSugerirNumero,
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

  const { obreros }: ResponseObrerosSelect = await submitForm("obreros");

  const { numero_disponible }: ResponseSugerirNumero =
    await submitForm("sugerirNumero");

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
