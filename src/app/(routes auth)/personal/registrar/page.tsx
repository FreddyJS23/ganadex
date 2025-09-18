import { FormCreateStaff } from "@/components/forms/create staff";
import { ResponseCargosPersonal } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { cargos_personal }: ResponseCargosPersonal =
    await submitForm("cargosPersonal");

  return (
    <>
      <TitlePage title="Registrar personal" />

      <FormCreateStaff cargos_personal={cargos_personal} />
    </>
  );
}
