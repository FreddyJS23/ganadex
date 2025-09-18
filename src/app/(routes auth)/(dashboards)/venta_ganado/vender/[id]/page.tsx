import { CreateSaleCattle } from "@/components/create item in modal/create sale cattle";
import { ResponseCompradores } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { compradores }: ResponseCompradores = await submitForm("compradores");

  return <CreateSaleCattle ListaCompradoresRegistrados={compradores} />;
}
