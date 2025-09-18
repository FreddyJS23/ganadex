import { TableCastreteBullCalf } from "@/components/tables/castrete bull calf";
import { ResponseCriasPendienteCapar } from "@/types";
import { TitlePage } from "@/ui/TitlePage";
import { submitForm } from "@/services/apiClient";

export default async function Page() {
  const { crias_pendiente_capar }: ResponseCriasPendienteCapar =
    await submitForm("criasCapar");

  return (
    <section>
      <TitlePage title="Becerros pendiente de capar" />
      <TableCastreteBullCalf crias_pendiente_capar={crias_pendiente_capar} />
    </section>
  );
}
