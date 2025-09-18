import { CreateVaccinationDay } from "@/components/create item in modal/create vaccination day";
import { ResponseVacunasDisponibles } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { vacunas_disponibles }: ResponseVacunasDisponibles =
    await submitForm("vacunasDisponibles");
  return <CreateVaccinationDay vacunas_disponibles={vacunas_disponibles} />;
}
