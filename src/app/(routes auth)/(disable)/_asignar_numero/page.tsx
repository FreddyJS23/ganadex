import { TableAssignmentNumberBullCalf } from "@/components/tables/assignment number bull calf";
import { ResponseCriasPendienteNumeracion } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { crias_pendiente_numeracion }: ResponseCriasPendienteNumeracion =
    await submitForm("criasNumeracion");

  return (
    <section>
      <TitlePage title="Asignación de números a becerros" />
      <TableAssignmentNumberBullCalf
        crias_pendiente_numeracion={crias_pendiente_numeracion}
      />
    </section>
  );
}
