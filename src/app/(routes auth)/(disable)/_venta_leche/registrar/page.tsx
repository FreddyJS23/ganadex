import { CreateSaleMilk } from "@/components/create item in modal/create sale milk";
import { ResponsePreciosLeche } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  
  const response = await getData<ResponsePreciosLeche>({endPoint:"preciosLeche"});
  const {precios}=responseErrorServer(response);


  return <CreateSaleMilk ListaPreciosRegistrados={precios} />;
}
