import { ModalHistoryPricesMilk } from "@/components/modals/historys/history prices of milk";
import { ResponsePreciosLeche } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { precios }: ResponsePreciosLeche = await submitForm("preciosLeche");

  return <ModalHistoryPricesMilk precios={precios} />;
}
