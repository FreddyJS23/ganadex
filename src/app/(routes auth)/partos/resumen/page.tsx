import { ResumenNatalidad } from "@/components/charts/resumen natalidad";
import { ResponseResumenNatalidad } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  
  
  const response=await getData<ResponseResumenNatalidad>({endPoint:"resumenNatalidad"});
  const {nacimientos_ultimos_5_año,nacimientos_año_actual}=responseErrorServer(response);
  

  return (
    <section>
      <TitlePage title="Resumen de natalidad" />
      <ResumenNatalidad
        nacimientos_año_actual={nacimientos_año_actual}
        nacimientos_ultimos_5_año={nacimientos_ultimos_5_año}
      />
    </section>
  );
}
