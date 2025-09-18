import { ModalDiscardCattle } from "@/components/modals/discard cattle";
import { ResponseGanado } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

type ParamsPage = {
  params: { id: number };
};

export default async function Page({ params }: ParamsPage) {
  
  const response = await getData<ResponseGanado>({endPoint:"ganado",id:params.id});
  const {ganado}=responseErrorServer(response);
  const {numero, nombre}=ganado;
  

  return <ModalDiscardCattle dataHeader={numero ? numero : nombre} />;
}
