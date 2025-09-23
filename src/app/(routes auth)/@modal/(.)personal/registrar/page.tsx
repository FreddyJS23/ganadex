import { ModalCreatePersonal } from "@/components/modals/create/create personal";
import type { ResponseCargosPersonal } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseCargosPersonal>({
    endPoint: "cargosPersonal",
  });
  const { cargos_personal } = responseErrorServer(response);

  return <ModalCreatePersonal cargos_personal={cargos_personal} />;
}
