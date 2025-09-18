import { TableAllBirths } from "@/components/tables/birth";
import { ResponsePartosGeneral } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { todos_partos }: ResponsePartosGeneral = await submitForm("partos");

  return (
    <section>
      <TitlePage title="Partos generales" />
      <TableAllBirths todos_partos={todos_partos} />
    </section>
  );
}
