import { ModalCreateUpdateCausaFallecimiento } from "@/components/modals/tipo fallecimiento";
import { ResponseCausaFallecimiento } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponseCausaFallecimiento>({
    endPoint: "causaFallecimiento",
    id: params.id,
  });
  const { causa_fallecimiento } = responseErrorServer(response);

  return (
    <ModalCreateUpdateCausaFallecimiento
      update={true}
      id={params.id}
      causa={causa_fallecimiento.causa}
    />
  );
}
