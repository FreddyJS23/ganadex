import { ModalTypeCheck } from "@/components/modals/historys/type checks";
import { ResponseTiposRevision } from "@/types";
import { getData } from "@/utils/getData";

export default async function Page() {
  const { tipos_revision }: ResponseTiposRevision =
    await getData("tiposRevision");

  return <ModalTypeCheck tipos_revision={tipos_revision} />;
}
