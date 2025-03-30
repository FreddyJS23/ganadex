import { CreateHacienda } from "@/components/create item in modal/create hacienda";
import { ModalSelectHaciendaSesion } from "@/components/modals/select hacienda sesion";
import { ResponseHaciendas } from "@/types";
import { getData } from "@/utils/getData";

export default async function Page() {
  const { haciendas }: ResponseHaciendas = await getData("hacienda");

  return haciendas.length == 0 ? (
    <CreateHacienda primeraHacienda={true} />
  ) : (
    <ModalSelectHaciendaSesion haciendas={haciendas} />
  );
}
