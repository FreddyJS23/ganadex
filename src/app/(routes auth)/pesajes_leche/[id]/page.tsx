import { ModalWeightMilk } from "@/components/modals/create/weight milk";
import type { ResponseGanado } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponseGanado>({
    endPoint: "ganado",
    id: params.id,
  });
  const { ganado } = responseErrorServer(response);

  const { numero, nombre } = ganado;

  return <ModalWeightMilk dataHeader={numero ? numero : nombre} />;
}
