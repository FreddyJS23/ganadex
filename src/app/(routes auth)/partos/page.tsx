import { TableAllBirths } from "@/components/tables/birth";
import { ResponsePartosGeneral } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { getData } from "@/services/apiClient";
import { responseErrorServer } from "@/utils/returnError";

export default async function Page() {
  const response = await getData<ResponsePartosGeneral>({ endPoint: "partos" });
  const { todos_partos } = responseErrorServer(response);

  return (
    <section>
      <TitlePage title="Partos generales" />
      <TableAllBirths todos_partos={todos_partos} />
    </section>
  );
}
