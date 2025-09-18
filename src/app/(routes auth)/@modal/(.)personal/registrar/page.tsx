import { ModalCreatePersonal } from "@/components/modals/create personal";
import { ResponseCargosPersonal } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { cargos_personal }: ResponseCargosPersonal =
    await submitForm("cargosPersonal");

  return <ModalCreatePersonal cargos_personal={cargos_personal} />;
}
