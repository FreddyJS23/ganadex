import { ModalCastrateBullCalf } from "@/components/modals/castrate bull calf";
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

  return <ModalCastrateBullCalf dataHeader={numero ? numero : nombre} />;
}
