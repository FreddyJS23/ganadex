import { ModalVaccines } from "@/components/modals/view/historys/available vaccines";
import { ResponseVacunas } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseVacunas>({ endPoint: "vacunas" });
  const { vacunas } = responseErrorServer(response);

  return <ModalVaccines vacunas={vacunas} />;
}

