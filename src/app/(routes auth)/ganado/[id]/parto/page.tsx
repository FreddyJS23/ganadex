import { ModalHistoryBirths } from "@/components/modals/historys/history births";
import { ResponsePartos } from "@/types";
import { submitForm } from "@/services/apiClient";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const { partos }: ResponsePartos = await submitForm(
    "ganado",
    "GET",
    undefined,
    params.id,
    "partos",
  );

  return <ModalHistoryBirths partos={partos} />;
}
