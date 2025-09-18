import { ResumenNatalidad } from "@/components/charts/resumen natalidad";
import { ResponseResumenNatalidad } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const {
    nacimientos_ultimos_5_año,
    nacimientos_año_actual,
  }: ResponseResumenNatalidad = await submitForm("resumenNatalidad");

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
