import { TableAllWeightMilk } from "@/components/tables/weight milk";
import { ResponsePesajesLecheGeneral } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  
  const response= await getData<ResponsePesajesLecheGeneral>({endPoint:"pesajesLeche"});
  const {todos_pesaje_leche}=responseErrorServer(response);
  

  return (
    <section>
      <TitlePage title="Pesaje de leche generales" />
      <TableAllWeightMilk todos_pesaje_leche={todos_pesaje_leche} />
    </section>
  );
}
