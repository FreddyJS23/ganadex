import { TableAllCheckups } from "@/components/tables/checkups";
import { ResponseRevisionesGeneral } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponseRevisionesGeneral>({
    endPoint: "revisiones",
  });
  const { todas_revisiones } = responseErrorServer(response);

  return (
    <section>
      <TitlePage title="Revisiones generales" />
      <TableAllCheckups todas_revisiones={todas_revisiones} />
    </section>
  );
}
