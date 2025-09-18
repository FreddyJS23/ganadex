import { TableAllServes } from "@/components/tables/serve";
import { ResponseServiciosGeneral } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { todos_servicios }: ResponseServiciosGeneral =
    await submitForm("servicios");

  return (
    <section>
      <TitlePage title="Servicios generales" />
      <TableAllServes todos_servicios={todos_servicios} />
    </section>
  );
}
