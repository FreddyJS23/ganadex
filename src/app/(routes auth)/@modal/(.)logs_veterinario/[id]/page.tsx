import { ModalLogsVeterinary } from "@/components/modals/view/logs veterinary";
import type { ResponseLogsVeterinary } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  const response = await getData<ResponseLogsVeterinary>({
    endPoint: "logsVeterinario",
    id: params.id,
  });
  const { logs } = responseErrorServer(response);

  return (
    <>
      <ModalLogsVeterinary logs_veterinario={logs} />
    </>
  );
}
