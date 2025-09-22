import { ModalHistoryCheckUps } from "@/components/modals/historys/history checkups";
import { ResponseRevisiones } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponseRevisiones>({
    endPoint: "ganado",
    id: params.id,
    endPointCattle: "revisiones",
  });
  const { revisiones } = responseErrorServer(response);

  return <ModalHistoryCheckUps revisiones={revisiones} />;
}
