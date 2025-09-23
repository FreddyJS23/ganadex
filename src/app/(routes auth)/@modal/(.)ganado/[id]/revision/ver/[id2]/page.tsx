import { ModalCheckUp } from "@/components/modals/view/checkup";
import type { ResponseRevision } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number; id2: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponseRevision>({
    endPoint: "ganado",
    id: params.id,
    endPointCattle: "revision",
    id2: params.id2,
  });
  const { revision } = responseErrorServer(response);

  return <ModalCheckUp revision={revision} />;
}
