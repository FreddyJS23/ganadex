import { TableSupplies } from "@/components/tables/supplies";
import { ResponseInsumos } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  
  /* endpoint erroneo a proposito para no tener error de tipo */
  const response = await getData<ResponseInsumos>({endPoint:"actualizarConfig"});
  const {insumos}=responseErrorServer(response);

  return (
    <section>
      <TitlePage title="Insumos" />
      <TableSupplies insumos={insumos} />
    </section>
  );
}
