import { ModalVaccines } from "@/components/modals/historys/available vaccines";
import { ResponseVacunas } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { vacunas }: ResponseVacunas = await submitForm("vacunas");

  return <ModalVaccines vacunas={vacunas} />;
}
