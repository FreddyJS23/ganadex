import { CreateDeathCattle } from "@/components/create item in modal/create death cattle";
import { ResponseCausasFallecimiento } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseCausasFallecimiento>({
    endPoint: "causasFallecimiento",
  });
  const { causas_fallecimiento } = responseErrorServer(response);

  return <CreateDeathCattle causas_fallecimeinto={causas_fallecimiento} />;
}
