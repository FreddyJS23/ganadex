import { ModalHistoryPricesMilk } from "@/components/modals/historys/history prices of milk";
import { ResponsePreciosLeche } from "@/types";
import { getData } from "@/utils/getData";

export default async function Page() {
  const { precios }: ResponsePreciosLeche = await getData("preciosLeche");

  return <ModalHistoryPricesMilk precios={precios} />;
}
