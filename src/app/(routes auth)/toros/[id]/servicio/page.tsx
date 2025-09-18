import { ModalHistoryServicesBull } from "@/components/modals/historys/history services";
import { getData } from "@/services/apiClient";
import { ResponseServiciosToro } from "@/types";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  
  const response = await getData<ResponseServiciosToro>({endPoint:"toro",id:params.id,endPointCattle:"servicios"});
  const {servicios}=responseErrorServer(response);
  

  return <ModalHistoryServicesBull servicios={servicios} />;
}
