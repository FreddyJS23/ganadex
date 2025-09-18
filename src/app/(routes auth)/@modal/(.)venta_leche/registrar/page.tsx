import { CreateSaleMilk } from "@/components/create item in modal/create sale milk";
import { ResponsePreciosLeche } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { precios }: ResponsePreciosLeche = await submitForm("preciosLeche");

  return <CreateSaleMilk ListaPreciosRegistrados={precios} />;
}
