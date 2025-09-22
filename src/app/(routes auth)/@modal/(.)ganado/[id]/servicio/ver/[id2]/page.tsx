import { ModalServe } from "@/components/modals/serve";
import { ResponseServicio } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number; id2: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponseServicio>({
    endPoint: "ganado",
    id: params.id,
    endPointCattle: "servicio",
    id2: params.id2,
  });
  const { servicio } = responseErrorServer(response);

  return <ModalServe servicio={servicio} />;
}
