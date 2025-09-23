import { CreateDeathCattle } from "@/components/modals/modal in pages/create death cattle";
import type { ResponseCausasFallecimiento } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseCausasFallecimiento>({
    endPoint: "causasFallecimiento",
  });
  const { causas_fallecimiento } = responseErrorServer(response);

  return <CreateDeathCattle causas_fallecimeinto={causas_fallecimiento} />;
}
