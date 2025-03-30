import { ModalServe } from "@/components/modals/serve";
import { ResponseServicio } from "@/types";
import { getData } from "@/utils/getData";

type ParamsPage = {
  params: { id: number; id2: number };
};

export default async function Page({ params }: ParamsPage) {
  const { servicio }: ResponseServicio = await getData(
    "ganado",
    "GET",
    undefined,
    params.id,
    "servicio",
    params.id2,
  );

  return <ModalServe servicio={servicio} />;
}
