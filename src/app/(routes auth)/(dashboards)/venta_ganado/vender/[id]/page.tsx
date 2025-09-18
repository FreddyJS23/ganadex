import { CreateSaleCattle } from "@/components/create item in modal/create sale cattle";
import { ResponseCompradores } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  
  const response = await getData<ResponseCompradores>({endPoint:"compradores"});
  const {compradores}=responseErrorServer(response);
  

  return <CreateSaleCattle ListaCompradoresRegistrados={compradores} />;
}
