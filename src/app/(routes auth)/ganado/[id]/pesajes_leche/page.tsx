import { ModalHistoryWeightMilk } from "@/components/modals/historys/history weight milk";
import { ResponsePesajesLeche } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponsePesajesLeche>({
    endPoint: "ganado",
    id: params.id,
    endPointCattle: "pesajesLeche",
  });
  const { pesajes_leche } = responseErrorServer(response);

  return <ModalHistoryWeightMilk pesajes_leche={pesajes_leche} />;
}
