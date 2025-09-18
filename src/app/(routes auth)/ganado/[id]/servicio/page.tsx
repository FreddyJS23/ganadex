import { ModalHistoryServices } from "@/components/modals/historys/history services bull";
import { ResponseServicios } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  
  const response = await getData<ResponseServicios>({endPoint:"ganado",id:params.id,endPointCattle:"servicios"});
  const {servicios}=responseErrorServer(response);
  

  return <ModalHistoryServices servicios={servicios} />;
}
