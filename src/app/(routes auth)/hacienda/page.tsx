import { CreateHacienda } from "@/components/create item in modal/create hacienda";
import { ModalSelectHaciendaSesion } from "@/components/modals/select hacienda sesion";
import { ResponseHaciendas } from "@/types";
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
