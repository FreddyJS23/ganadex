import { ModalHistoryServicesBull } from "@/components/modals/historys/history services";
import { ResponseServiciosToros } from "@/types";
import { submitForm } from "@/services/apiClient";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const { servicios }: ResponseServiciosToros = await submitForm(
    "toro",
    "GET",
    undefined,
    params.id,
    "servicios",
  );

  return <ModalHistoryServicesBull servicios={servicios} />;
}
