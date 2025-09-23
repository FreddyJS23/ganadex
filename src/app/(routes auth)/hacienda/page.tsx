import { CreateHacienda } from "@/components/modals/modal in pages/create hacienda";
import { ModalSelectHaciendaSesion } from "@/components/modals/create/select hacienda sesion";
import type { ResponseHaciendas } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseHaciendas>({ endPoint: "hacienda" });
  const { haciendas } = responseErrorServer(response);

  return haciendas.length == 0 ? (
    <CreateHacienda primeraHacienda={true} />
  ) : (
    <ModalSelectHaciendaSesion haciendas={haciendas} />
  );
}
