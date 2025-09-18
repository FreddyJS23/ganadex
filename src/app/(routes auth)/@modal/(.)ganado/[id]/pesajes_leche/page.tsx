import { ModalHistoryWeightMilk } from "@/components/modals/historys/history weight milk";
import { ResponsePesajesLeche } from "@/types";
import { submitForm } from "@/services/apiClient";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const { pesajes_leche }: ResponsePesajesLeche = await submitForm(
    "ganado",
    "GET",
    undefined,
    params.id,
    "pesajesLeche",
  );

  return <ModalHistoryWeightMilk pesajes_leche={pesajes_leche} />;
}
