import { ModalCreateUpdateTypeCheck } from "@/components/modals/type check";
import { ResponseTipoRevision } from "@/types";
import { getData } from "@/utils/getData";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const { tipo_revision }: ResponseTipoRevision = await getData(
    "tipoRevision",
    "GET",
    undefined,
    params.id,
  );

  console.log(tipo_revision);
  return (
    <ModalCreateUpdateTypeCheck
      update={true}
      id={params.id}
      typeCheck={tipo_revision.tipo}
      codeCheck={tipo_revision.codigo ?? undefined}
    />
  );
}
