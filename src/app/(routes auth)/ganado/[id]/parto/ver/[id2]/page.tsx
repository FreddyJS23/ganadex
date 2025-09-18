import { ModalBirth } from "@/components/modals/birth";
import { ResponseParto } from "@/types";
import { submitForm } from "@/services/apiClient";

type ParamsPage = {
  params: { id: number; id2: number };
};

export default async function Page({ params }: ParamsPage) {
  const { parto }: ResponseParto = await submitForm(
    "ganado",
    "GET",
    undefined,
    params.id,
    "parto",
    params.id2,
  );

  return <ModalBirth parto={parto} />;
}
