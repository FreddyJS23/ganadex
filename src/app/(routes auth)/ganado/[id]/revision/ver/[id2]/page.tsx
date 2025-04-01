import { ModalCheckUp } from "@/components/modals/checkup";
import { ResponseRevision, ResponseTiposRevision, ResponseVeterinariosSelect } from "@/types";
import { getData } from "@/utils/getData";

type ParamsPage = {
  params: { id: number; id2: number };
};

export default async function Page({ params }: ParamsPage) {
  const { revision }: ResponseRevision = await getData(
    "ganado",
    "GET",
    undefined,
    params.id,
    "revision",
    params.id2,
  );

  const { veterinarios }: ResponseVeterinariosSelect = await getData(
    "veterinariosHaciendaActual",
  );

  const { tipos_revision }: ResponseTiposRevision =
    await getData("tiposRevision");

  return <ModalCheckUp revision={revision} />;
}
