import { ModalHistoryBirths } from "@/components/modals/view/historys/history births";
import { ResponsePartos } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponsePartos>({
    endPoint: "ganado",
    id: params.id,
    endPointCattle: "partos",
  });
  const { partos } = responseErrorServer(response);

  return <ModalHistoryBirths partos={partos} />;
}
