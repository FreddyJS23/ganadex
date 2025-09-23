import { CreateSaleCattle } from "@/components/modals/modal in pages/create sale cattle";
import type { ResponseCompradores } from "@/types";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseCompradores>({
    endPoint: "compradores",
  });
  const { compradores } = responseErrorServer(response);

  return <CreateSaleCattle ListaCompradoresRegistrados={compradores} />;
}
