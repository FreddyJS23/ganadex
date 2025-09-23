import { ModalBirth } from "@/components/modals/view/birth";
import type { ResponseParto } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number; id2: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponseParto>({
    endPoint: "ganado",
    id: params.id,
    endPointCattle: "parto",
    id2: params.id2,
  });
  const { parto } = responseErrorServer(response);

  return <ModalBirth parto={parto} />;
}
