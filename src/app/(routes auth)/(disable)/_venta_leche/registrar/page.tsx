import { CreateSaleMilk } from "@/components/modals/modal in pages/create sale milk";
import type { ResponsePreciosLeche } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponsePreciosLeche>({
    endPoint: "preciosLeche",
  });
  const { precios } = responseErrorServer(response);

  return <CreateSaleMilk ListaPreciosRegistrados={precios} />;
}
