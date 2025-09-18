import { ModalLogsVeterinary } from "@/components/modals/logs veterinary";
import { ResponseLogsVeterinary } from "@/types";
import { submitForm } from "@/services/apiClient";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const { logs }: ResponseLogsVeterinary = await submitForm(
    "logsVeterinario",
    "GET",
    undefined,
    params.id,
  );

  return (
    <>
      <ModalLogsVeterinary logs_veterinario={logs} />
    </>
  );
}
