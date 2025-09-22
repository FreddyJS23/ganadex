import { ModalCausasFallecimiento } from "@/components/modals/historys/causas fallecimiento";
import { ResponseCausasFallecimiento } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseCausasFallecimiento>({
    endPoint: "causasFallecimiento",
  });

  const { causas_fallecimiento } = responseErrorServer(response);

  return (
    <ModalCausasFallecimiento causas_fallecimiento={causas_fallecimiento} />
  );
}
