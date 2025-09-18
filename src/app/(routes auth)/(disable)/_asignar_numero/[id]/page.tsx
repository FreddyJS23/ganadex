import { ModalAssignmentNumberBullCalf } from "@/components/modals/assignment number bull calf";
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
 

  return (
    <ModalAssignmentNumberBullCalf dataHeader={numero ? numero : nombre} />
  );
}
