import { ModalCustomers } from "@/components/modals/historys/customers";
import { ResponseCompradores } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseCompradores>({endPoint:"compradores"});
  const {compradores}=responseErrorServer(response);
  

  return <ModalCustomers compradores={compradores} />;
}
