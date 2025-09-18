import { CreateHacienda } from "@/components/create item in modal/create hacienda";
import { ModalSelectHaciendaSesion } from "@/components/modals/select hacienda sesion";
import { ResponseHaciendas } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { haciendas }: ResponseHaciendas = await submitForm("hacienda");

  return haciendas.length == 0 ? (
    <CreateHacienda primeraHacienda={true} />
  ) : (
    <ModalSelectHaciendaSesion haciendas={haciendas} />
  );
}
