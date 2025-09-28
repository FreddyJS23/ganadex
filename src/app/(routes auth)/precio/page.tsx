import { ModalHistoryPricesMilk } from "@/components/modals/view/historys/history prices of milk";
import { ResponsePreciosLeche } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponsePreciosLeche>({
    endPoint: "preciosLeche",
  });
  const { precios } = responseErrorServer(response);

  return <ModalHistoryPricesMilk precios={precios} />;
}
