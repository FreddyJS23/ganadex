import { ModalCheckUp } from "@/components/modals/checkup";
import {
  ResponseRevision,
} from "@/types";
import { submitForm } from "@/services/apiClient";

type ParamsPage = {
  params: { id: number; id2: number };
};

export default async function Page({ params }: ParamsPage) {
  const { revision }: ResponseRevision = await submitForm(
    "ganado",
    "GET",
    undefined,
    params.id,
    "revision",
    params.id2,
  );



  return <ModalCheckUp revision={revision} />;
}
