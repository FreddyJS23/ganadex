import { ModalTypeCheck } from "@/components/modals/historys/type checks";
import { ResponseTiposRevision } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { tipos_revision }: ResponseTiposRevision =
    await submitForm("tiposRevision");

  return <ModalTypeCheck tipos_revision={tipos_revision} />;
}
