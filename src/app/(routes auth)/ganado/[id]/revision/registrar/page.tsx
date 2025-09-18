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

  const { tipos_revision }: ResponseTiposRevision =
    await submitForm("tiposRevision");

  const { vacunas_disponibles }: ResponseVacunasDisponibles =
    await submitForm("vacunasDisponibles");

  const { toros }: ResponseToros = await submitForm("todosToro", "GET", undefined);

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
