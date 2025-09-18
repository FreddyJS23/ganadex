import { ModalCreateUpdateCausaFallecimiento } from "@/components/modals/tipo fallecimiento";
import { ResponseCausaFallecimiento } from "@/types";
import { submitForm } from "@/services/apiClient";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const { causa_fallecimiento }: ResponseCausaFallecimiento = await submitForm(
    "causaFallecimiento",
    "GET",
    undefined,
    params.id,
  );

  return (
    <ModalCreateUpdateCausaFallecimiento
      update={true}
      id={params.id}
      causa={causa_fallecimiento.causa}
    />
  );
}
