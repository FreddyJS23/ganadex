import { ModalHistoryServicesBull } from "@/components/modals/historys/history services";
import { ResponseServicios, ResponseServiciosToros } from "@/types";
import { getData } from "@/utils/getData";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const { servicios }: ResponseServiciosToros = await getData(
    "toro",
    "GET",
    undefined,
    params.id,
    "servicios",
  );

  return <ModalHistoryServicesBull servicios={servicios} />;
}
