import { ModalCustomers } from "@/components/modals/historys/customers";
import { ResponseCompradores } from "@/types";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { compradores }: ResponseCompradores = await submitForm("compradores");

  return <ModalCustomers compradores={compradores} />;
}
