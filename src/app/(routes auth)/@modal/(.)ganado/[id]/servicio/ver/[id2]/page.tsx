import { ModalServe } from "@/components/modals/serve";
import { ResponseServicio } from "@/types";
import { submitForm } from "@/services/apiClient";

type ParamsPage = {
  params: { id: number; id2: number };
};

export default async function Page({ params }: ParamsPage) {
  const { servicio }: ResponseServicio = await submitForm(
    "ganado",
    "GET",
    undefined,
    params.id,
    "servicio",
    params.id2,
  );

  return <ModalServe servicio={servicio} />;
}
