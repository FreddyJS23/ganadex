import { ModalCreateUpdateTypeCheck } from "@/components/modals/create/type check";
import type { ResponseTipoRevision } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponseTipoRevision>({
    endPoint: "tipoRevision",
    id: params.id,
  });
  const { tipo_revision } = responseErrorServer(response);

  return (
    <ModalCreateUpdateTypeCheck
      update={true}
      id={params.id}
      typeCheck={tipo_revision.tipo}
      codeCheck={tipo_revision.codigo ?? undefined}
    />
  );
}
