import { ModalDiscardCattle } from "@/components/modals/discard cattle";
import { ResponseGanado } from "@/types";
import { submitForm } from "@/services/apiClient";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const { ganado }: ResponseGanado = await submitForm(
    "ganado",
    "GET",
    undefined,
    params.id,
  );
  const { numero, nombre } = ganado;

  return <ModalDiscardCattle dataHeader={numero ? numero : nombre} />;
}
