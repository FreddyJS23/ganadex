import { ModalTypeCheck } from "@/components/modals/historys/type checks";
import { ResponseTiposRevision } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  
  const response = await getData<ResponseTiposRevision>({endPoint:"tiposRevision"});
  const {tipos_revision}=responseErrorServer(response);
  

  return <ModalTypeCheck tipos_revision={tipos_revision} />;
}
