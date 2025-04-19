import { ModalCreatePersonal } from "@/components/modals/create personal";
import { ResponseCargosPersonal } from "@/types";
import { getData } from "@/utils/getData";

export default async function Page() {
  const { cargos_personal }: ResponseCargosPersonal =
    await getData("cargosPersonal");

  return <ModalCreatePersonal cargos_personal={cargos_personal} />;
    

}
