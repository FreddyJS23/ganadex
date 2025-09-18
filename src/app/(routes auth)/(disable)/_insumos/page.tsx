import { TableSupplies } from "@/components/tables/supplies";
import { ResponseInsumos } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { insumos }: ResponseInsumos = await submitForm("insumos");
  return (
    <section>
      <TitlePage title="Insumos" />
      <TableSupplies insumos={insumos} />
    </section>
  );
}
