import { TableAllServes } from "@/components/tables/serve";
import { ResponseServiciosGeneral } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseServiciosGeneral>({
    endPoint: "servicios",
  });
  const { todos_servicios } = responseErrorServer(response);

  return (
    <section>
      <TitlePage title="Servicios generales" />
      <TableAllServes todos_servicios={todos_servicios} />
    </section>
  );
}
