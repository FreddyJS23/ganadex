import { ModalLogsVeterinary } from "@/components/modals/logs veterinary";
import { ResponseLogsVeterinary } from "@/types";
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
